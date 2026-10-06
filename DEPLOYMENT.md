# Production Deployment & Operations Guide
## Agro Dairy Export LLP — Agricultural Commodity Export Platform

This document outlines the production deployment, infrastructure architecture, background workers, security hardening, and maintenance procedures for the **Agro Dairy Export LLP** Laravel 12 web application.

---

### 1. Server Prerequisites & PHP Extensions

- **Operating System:** Ubuntu 22.04 LTS / 24.04 LTS, Debian 12, or AlmaLinux 9.
- **Web Server:** Nginx (recommended) or Apache 2.4 with `mod_rewrite` enabled.
- **PHP Version:** PHP 8.2 or 8.3+ (Tested and verified on PHP 8.3.30).
- **Mandatory PHP Extensions:**
  - `php-bcmath` (Precision floating-point calculations for landed cost & payload math)
  - `php-ctype`, `php-curl`, `php-dom`, `php-fileinfo`, `php-intl`, `php-json`
  - `php-mbstring`, `php-openssl`, `php-pcre`, `php-pdo_mysql`
  - `php-tokenizer`, `php-xml`, `php-zip`, `php-gd` (or `php-imagick` for product images & certificates)
- **Database:** MySQL 8.0+ or MariaDB 10.11+
- **Process Manager:** `supervisor` (for background queues)
- **SSL Certificate:** TLS 1.3 Let's Encrypt / Commercial SSL.

---

### 2. Initial Server Setup & Git Deployment

```bash
# 1. Clone repository into web directory
cd /var/www
git clone git@github.com:agrodairy/agrodairy.git agrodairy
cd /var/www/agrodairy

# 2. Configure Environment
cp .env.example .env
nano .env # Configure production DB credentials, APP_KEY, mail and domains

# 3. Install Composer Dependencies (optimized for production)
composer install --no-dev --optimize-autoloader --no-interaction

# 4. Generate Application Encryption Key
php artisan key:generate --force

# 5. Execute Database Migrations and Production Seeds
php artisan migrate --force
php artisan db:seed --class=AgroExportSeeder --force

# 6. Create Storage Symlink
php artisan storage:link

# 7. Compile Frontend Production Assets
npm ci
npm run build

# 8. Optimize Configuration, Routes, and Blade Views
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

### 3. Permissions & Security Hardening

Ensure the web server user (`www-data` on Ubuntu/Debian) owns only the necessary writable directories:

```bash
sudo chown -R www-data:www-data /var/www/agrodairy
sudo find /var/www/agrodairy -type f -exec chmod 644 {} \;
sudo find /var/www/agrodairy -type d -exec chmod 755 {} \;

# Storage and cache must be writable by www-data
sudo chmod -R 775 /var/www/agrodairy/storage
sudo chmod -R 775 /var/www/agrodairy/bootstrap/cache
```

---

### 4. Nginx Server Configuration

Create `/etc/nginx/sites-available/agrodairy.conf`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name agrodairy.com www.agrodairy.com;
    return 301 https://agrodairy.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name agrodairy.com;
    root /var/www/agrodairy/public;

    ssl_certificate /etc/letsencrypt/live/agrodairy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/agrodairy.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    index index.php index.html;
    charset utf-8;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    # Static assets long caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2|woff|ttf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Block access to hidden/sensitive files
    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Restrict direct access to inquiry uploads
    location ^~ /storage/inquiry_attachments/ {
        deny all;
        return 403;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/agrodairy.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 5. Supervisor Worker Configuration (Background Queues & Email Delivery)

For handling inquiry email dispatch, quotation PDF rendering jobs, and logging without blocking HTTP requests:

Create `/etc/supervisor/conf.d/agrodairy-worker.conf`:

```ini
[program:agrodairy-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/agrodairy/artisan queue:work database --sleep=3 --tries=3 --max-time=3600 --timeout=90
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/agrodairy/storage/logs/worker.log
stopwaitsecs=3600
```

Start Supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start agrodairy-worker:*
```

---

### 6. Scheduled Tasks (Cron Jobs)

Add Laravel schedule runner to crontab:

```bash
sudo crontab -u www-data -e
```

Add the following line:
```cron
* * * * * cd /var/www/agrodairy && php artisan schedule:run >> /dev/null 2>&1
```

Scheduled tasks include:
- Automatic detection and email notification for upcoming certificate expirations (APEDA, FSSAI, ISO, Halal).
- Pruning old database sessions.
- Generating daily analytics summaries.

---

### 7. Zero-Downtime Deployment Script (`deploy.sh`)

Save as `/var/www/agrodairy/deploy.sh` and make executable (`chmod +x deploy.sh`):

```bash
#!/bin/bash
set -e

echo "=== Deploying Agro Dairy Export LLP Production ==="

cd /var/www/agrodairy

# Put app into maintenance mode
php artisan down --render="errors.503" --secret="agrodairy-deploy-bypass-token"

# Pull latest commits
git pull origin main

# Install PHP dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Run any new migrations
php artisan migrate --force

# Build frontend bundles
npm ci
npm run build

# Clear and rebuild caches
php artisan cache:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart queue workers gracefully
php artisan queue:restart

# Bring app back online
php artisan up

echo "=== Deployment Successfully Completed ==="
```

---

### 8. Backup & Disaster Recovery Procedures

#### Automated MySQL Daily Database Backup
Create `/usr/local/bin/backup-agrodairy.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/agrodairy"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

# Dump database
mysqldump -u agrodairy_user -p'secret_db_password' agrodairy | gzip > "$BACKUP_DIR/agrodairy_db_$DATE.sql.gz"

# Backup user uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C /var/www/agrodairy/storage/app/public .

# Keep only last 14 days of backups
find "$BACKUP_DIR" -type f -mtime +14 -delete
```

#### Restoration Procedure
```bash
# 1. Restore Database
gunzip < /var/backups/agrodairy/agrodairy_db_YYYYMMDD_HHMMSS.sql.gz | mysql -u agrodairy_user -p'secret_db_password' agrodairy

# 2. Restore Uploads
tar -xzf /var/backups/agrodairy/uploads_YYYYMMDD_HHMMSS.tar.gz -C /var/www/agrodairy/storage/app/public/

# 3. Clear application caches
php artisan cache:clear
php artisan view:clear
```
