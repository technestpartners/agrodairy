const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');
const liveSyncService = require('../services/liveSync');

// Multer Storage Configuration for Direct Image Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif|ico|avif/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, SVG, GIF, ICO) are allowed'));
    }
  }
});

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = users[0];

    // Normalize PHP bcrypt hash if needed ($2y$ -> $2a$)
    const normalizedHash = user.password.replace(/^\$2y\$/, '$2a$');
    const isValid = bcrypt.compareSync(password, normalizedHash);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'agrodairy_jwt_secret_token_secure_2026_xyz!',
      { expiresIn: '7d' }
    );

    // Record audit log
    await pool.query(`
      INSERT INTO audit_logs (user_id, action, model_type, model_id, details, ip_address, created_at, updated_at)
      VALUES (?, 'login', 'User', ?, 'Admin portal session login', ?, NOW(), NOW())
    `, [user.id, user.id, req.ip || '127.0.0.1']);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/admin/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, phone, department, created_at FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: users[0] });
  } catch (error) {
    console.error('Error in /me:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/dashboard
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const [totalProducts] = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = 1');
    const [totalInquiries] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
    const [newInquiries] = await pool.query("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'");
    const [totalBatches] = await pool.query('SELECT COUNT(*) as count FROM traceability_batches WHERE is_active = 1');
    const [totalQuotations] = await pool.query('SELECT COUNT(*) as count FROM quotations');

    // Inquiries grouped by status
    const [statusBreakdown] = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM inquiries
      GROUP BY status
    `);

    // Recent 5 inquiries
    const [recentInquiries] = await pool.query(`
      SELECT i.id, i.inquiry_number, i.name, i.company, i.country, i.status, i.quantity, i.unit, i.created_at,
             p.name as product_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      ORDER BY i.created_at DESC
      LIMIT 6
    `);

    // Category distribution
    const [categoryCounts] = await pool.query(`
      SELECT c.name, COUNT(p.id) as count
      FROM product_categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY count DESC
    `);

    res.json({
      success: true,
      stats: {
        totalProducts: totalProducts[0].count,
        totalInquiries: totalInquiries[0].count,
        newInquiries: newInquiries[0].count,
        totalBatches: totalBatches[0].count,
        totalQuotations: totalQuotations[0].count,
        statusBreakdown,
        recentInquiries,
        categoryCounts
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, u.name as user_name, u.email as user_email
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 100
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==========================================
// CMS WEBSITE MANAGEMENT: SETTINGS (HEADER, HERO, COMPANY, FOOTER)
// ==========================================

// GET /api/admin/settings
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `id`, `key`, `value`, `group`, `label`, `updated_at` FROM settings ORDER BY `group` ASC, `id` ASC');
    const settingsMap = {};
    const grouped = {};

    rows.forEach(r => {
      settingsMap[r.key] = r.value;
      const grp = r.group || 'general';
      if (!grouped[grp]) grouped[grp] = [];
      grouped[grp].push(r);
    });

    res.json({ success: true, data: settingsMap, grouped, raw: rows });
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/admin/settings (bulk update)
router.put('/settings', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const settingsObj = (req.body && req.body.settings && typeof req.body.settings === 'object')
      ? req.body.settings
      : req.body;

    if (!settingsObj || typeof settingsObj !== 'object' || Array.isArray(settingsObj)) {
      return res.status(400).json({ success: false, message: 'Invalid settings payload' });
    }

    const updates = Object.entries(settingsObj);
    for (const [key, value] of updates) {
      await pool.query(`
        INSERT INTO settings (\`key\`, \`value\`, \`group\`, \`label\`, created_at, updated_at)
        VALUES (?, ?, 'general', ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`), updated_at = NOW()
      `, [key, value, key.replace(/_/g, ' ').toUpperCase()]);
    }

    // Audit log
    await pool.query(`
      INSERT INTO audit_logs (user_id, action, model_type, model_id, details, ip_address, created_at, updated_at)
      VALUES (?, 'update', 'Settings', 1, 'Updated website CMS settings (Header/Hero/General)', ?, NOW(), NOW())
    `, [req.user.id, req.ip || '127.0.0.1']);

    // Broadcast live event to all connected clients & tabs
    liveSyncService.broadcastLiveEvent('SETTINGS_UPDATED', {
      user: req.user.email,
      keys: Object.keys(settingsObj),
      timestamp: Date.now()
    });

    res.json({ success: true, message: 'Website settings saved successfully' });
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// MEDIA & IMAGE UPLOAD MANAGEMENT
// ==========================================

// POST /api/admin/upload-image
router.post('/upload-image', authenticateToken, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    // 1. Multipart file upload
    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      
      // Mirror file to client/public/uploads if it exists for local dev hot-reload
      const clientUploads = path.join(__dirname, '../../client/public/uploads');
      if (fs.existsSync(clientUploads)) {
        try {
          fs.copyFileSync(req.file.path, path.join(clientUploads, req.file.filename));
        } catch (_) {}
      }

      await pool.query(`
        INSERT INTO audit_logs (user_id, action, model_type, model_id, details, ip_address, created_at, updated_at)
        VALUES (?, 'upload', 'Media', 0, ?, ?, NOW(), NOW())
      `, [req.user?.id || 1, `Uploaded media: ${req.file.originalname}`, req.ip || '127.0.0.1']);

      return res.json({
        success: true,
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      });
    }

    // 2. Base64 payload upload
    if (req.body && req.body.image && typeof req.body.image === 'string' && req.body.image.startsWith('data:')) {
      const matches = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ success: false, message: 'Invalid base64 image data' });
      }
      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const ext = mimeType.split('/')[1] || 'jpg';
      const cleanName = (req.body.filename ? path.basename(req.body.filename, path.extname(req.body.filename)) : 'asset').replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
      const filename = `${cleanName}-${Date.now()}.${ext === 'svg+xml' ? 'svg' : ext}`;
      
      const uploadPath = path.join(__dirname, '../../public/uploads');
      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
      const targetFilePath = path.join(uploadPath, filename);
      fs.writeFileSync(targetFilePath, buffer);

      const clientUploads = path.join(__dirname, '../../client/public/uploads');
      if (fs.existsSync(clientUploads)) {
        try {
          fs.copyFileSync(targetFilePath, path.join(clientUploads, filename));
        } catch (_) {}
      }

      return res.json({
        success: true,
        url: `/uploads/${filename}`,
        filename: filename
      });
    }

    return res.status(400).json({ success: false, message: 'No image file or valid base64 data provided' });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/media-library
router.get('/media-library', authenticateToken, async (req, res) => {
  try {
    const mediaFiles = [];
    const dirsToScan = [
      { dir: path.join(__dirname, '../../public/uploads'), prefix: '/uploads' },
      { dir: path.join(__dirname, '../../public/images'), prefix: '/images' },
      { dir: path.join(__dirname, '../../public/images/products'), prefix: '/images/products' },
      { dir: path.join(__dirname, '../../public/images/bg'), prefix: '/images/bg' }
    ];

    for (const item of dirsToScan) {
      if (fs.existsSync(item.dir)) {
        const files = fs.readdirSync(item.dir);
        for (const file of files) {
          try {
            const fullPath = path.join(item.dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isFile() && /\.(jpg|jpeg|png|webp|svg|gif|ico)$/i.test(file)) {
              mediaFiles.push({
                name: file,
                url: `${item.prefix}/${file}`,
                size: stat.size,
                createdAt: stat.birthtime || stat.mtime,
                folder: item.prefix.replace('/', '')
              });
            }
          } catch (_) {}
        }
      }
    }

    // Sort newest first
    mediaFiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, count: mediaFiles.length, data: mediaFiles });
  } catch (error) {
    console.error('Media library error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CMS COMMODITIES (PRODUCTS) MANAGEMENT
// ==========================================

// GET /api/admin/commodities
router.get('/commodities', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      ORDER BY p.sort_order ASC, p.id ASC
    `);
    const [categories] = await pool.query('SELECT id, name, slug FROM product_categories WHERE is_active = 1');
    res.json({ success: true, data: rows, categories });
  } catch (error) {
    console.error('Error in /admin/commodities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/commodities
router.post('/commodities', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const {
      name, slug, category_id, origin, grade_variety, hs_code, moq, moq_unit,
      short_description, description, main_image, is_featured, is_active, sort_order
    } = req.body;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const [result] = await pool.query(`
      INSERT INTO products (
        name, slug, category_id, origin, grade_variety, hs_code, moq, moq_unit,
        short_description, description, main_image, is_featured, is_active, sort_order,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      name, generatedSlug, category_id || 1, origin || 'Gujarat, India',
      grade_variety || 'Export Grade', hs_code || '', moq || 20, moq_unit || 'MT',
      short_description || '', description || '', main_image || '',
      is_featured ? 1 : 0, is_active !== false ? 1 : 0, sort_order || 0
    ]);

    liveSyncService.broadcastLiveEvent('COMMODITIES_UPDATED', { action: 'create', id: result.insertId });
    res.status(201).json({ success: true, message: 'Commodity added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding commodity:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/commodities/:id
router.put('/commodities/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, slug, category_id, origin, grade_variety, hs_code, moq, moq_unit,
      short_description, description, main_image, is_featured, is_active, sort_order
    } = req.body;

    await pool.query(`
      UPDATE products SET
        name = ?, slug = ?, category_id = ?, origin = ?, grade_variety = ?,
        hs_code = ?, moq = ?, moq_unit = ?, short_description = ?, description = ?,
        main_image = ?, is_featured = ?, is_active = ?, sort_order = ?, updated_at = NOW()
      WHERE id = ?
    `, [
      name, slug, category_id, origin, grade_variety,
      hs_code, moq, moq_unit, short_description, description,
      main_image, is_featured ? 1 : 0, is_active ? 1 : 0, sort_order || 0, id
    ]);

    liveSyncService.broadcastLiveEvent('COMMODITIES_UPDATED', { action: 'update', id });
    res.json({ success: true, message: 'Commodity updated successfully' });
  } catch (error) {
    console.error('Error updating commodity:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/commodities/:id
router.delete('/commodities/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    liveSyncService.broadcastLiveEvent('COMMODITIES_UPDATED', { action: 'delete', id });
    res.json({ success: true, message: 'Commodity deleted successfully' });
  } catch (error) {
    console.error('Error deleting commodity:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CMS GALLERY ITEMS MANAGEMENT
// ==========================================

// GET /api/admin/gallery
router.get('/gallery', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery_items ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching admin gallery:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/gallery
router.post('/gallery', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { title, category, category_slug, image, location, badge, specs, description, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO gallery_items (
        title, category, category_slug, image, location, badge, specs, description, sort_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      title, category, category_slug || 'general', image, location || 'Gujarat, India',
      badge || 'Export Grade', specs || '', description || '', sort_order || 0, is_active !== false ? 1 : 0
    ]);
    liveSyncService.broadcastLiveEvent('GALLERY_UPDATED', { action: 'create', id: result.insertId });
    res.status(201).json({ success: true, message: 'Gallery photograph added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding gallery item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/gallery/:id
router.put('/gallery/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, category_slug, image, location, badge, specs, description, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE gallery_items SET
        title = ?, category = ?, category_slug = ?, image = ?, location = ?,
        badge = ?, specs = ?, description = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [
      title, category, category_slug || 'general', image, location,
      badge, specs, description, sort_order || 0, is_active ? 1 : 0, id
    ]);
    liveSyncService.broadcastLiveEvent('GALLERY_UPDATED', { action: 'update', id });
    res.json({ success: true, message: 'Gallery item updated successfully' });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/gallery/:id
router.delete('/gallery/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM gallery_items WHERE id = ?', [id]);
    liveSyncService.broadcastLiveEvent('GALLERY_UPDATED', { action: 'delete', id });
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CMS FAQs & TESTIMONIALS MANAGEMENT
// ==========================================

// GET /api/admin/faqs
router.get('/faqs', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/faqs
router.post('/faqs', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { question, answer, category, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO faqs (question, answer, category, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `, [question, answer, category || 'general', sort_order || 0, is_active !== false ? 1 : 0]);
    liveSyncService.broadcastLiveEvent('FAQS_UPDATED', { action: 'create', id: result.insertId });
    res.status(201).json({ success: true, message: 'FAQ added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/faqs/:id
router.put('/faqs/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [question, answer, category || 'general', sort_order || 0, is_active ? 1 : 0, id]);
    liveSyncService.broadcastLiveEvent('FAQS_UPDATED', { action: 'update', id });
    res.json({ success: true, message: 'FAQ updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/faqs/:id
router.delete('/faqs/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
    liveSyncService.broadcastLiveEvent('FAQS_UPDATED', { action: 'delete', id });
    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/testimonials
router.get('/testimonials', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/admin/testimonials
router.post('/testimonials', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { client_name, company_name, country, rating, content, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO testimonials (client_name, company_name, country, rating, content, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [client_name, company_name, country, rating || 5, content, sort_order || 0, is_active !== false ? 1 : 0]);
    res.status(201).json({ success: true, message: 'Testimonial added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/testimonials/:id
router.put('/testimonials/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { client_name, company_name, country, rating, content, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE testimonials SET client_name = ?, company_name = ?, country = ?, rating = ?, content = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [client_name, company_name, country, rating || 5, content, sort_order || 0, is_active ? 1 : 0, id]);
    res.json({ success: true, message: 'Testimonial updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// TEAM / EXECUTIVE LEADERSHIP MANAGEMENT
// ==========================================

// GET /api/admin/team
router.get('/team', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/team
router.post('/team', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { name, position, bio, email, linkedin, image, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO team_members (name, position, bio, email, linkedin, image, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [name, position, bio || '', email || '', linkedin || '', image || '', sort_order || 0, is_active !== false ? 1 : 0]);
    res.status(201).json({ success: true, message: 'Executive team member added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/team/:id
router.put('/team/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, bio, email, linkedin, image, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE team_members SET
        name = ?, position = ?, bio = ?, email = ?, linkedin = ?,
        image = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [name, position, bio, email, linkedin, image, sort_order || 0, is_active ? 1 : 0, id]);
    res.json({ success: true, message: 'Executive team member updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/team/:id
router.delete('/team/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM team_members WHERE id = ?', [id]);
    res.json({ success: true, message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// CERTIFICATIONS & COMPLIANCE MANAGEMENT
// ==========================================

// GET /api/admin/certifications
router.get('/certifications', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM certifications ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/certifications
router.post('/certifications', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { title, slug, certificate_no, issuing_body, issue_date, expiry_date, verification_url, status, description, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO certifications (
        title, slug, certificate_no, issuing_body, issue_date, expiry_date, verification_url, status, description, sort_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      title, slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), certificate_no, issuing_body || '',
      issue_date || null, expiry_date || null, verification_url || '', status || 'active', description || '',
      sort_order || 0, is_active !== false ? 1 : 0
    ]);
    res.status(201).json({ success: true, message: 'Certification credential added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/certifications/:id
router.put('/certifications/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, certificate_no, issuing_body, issue_date, expiry_date, verification_url, status, description, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE certifications SET
        title = ?, slug = ?, certificate_no = ?, issuing_body = ?, issue_date = ?, expiry_date = ?,
        verification_url = ?, status = ?, description = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [
      title, slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), certificate_no, issuing_body,
      issue_date || null, expiry_date || null, verification_url, status, description, sort_order || 0, is_active ? 1 : 0, id
    ]);
    res.json({ success: true, message: 'Certification updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/certifications/:id
router.delete('/certifications/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM certifications WHERE id = ?', [id]);
    res.json({ success: true, message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// PORTS & MARITIME GATEWAYS MANAGEMENT
// ==========================================

// GET /api/admin/ports
router.get('/ports', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ports ORDER BY is_major DESC, name ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/ports
router.post('/ports', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { name, code, type, is_major, country_id } = req.body;
    const [result] = await pool.query(`
      INSERT INTO ports (name, code, type, is_major, country_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `, [name, code, type || 'Sea Port', is_major ? 1 : 0, country_id || 1]);
    res.status(201).json({ success: true, message: 'Port added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/ports/:id
router.put('/ports/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, type, is_major } = req.body;
    await pool.query(`
      UPDATE ports SET name = ?, code = ?, type = ?, is_major = ?, updated_at = NOW()
      WHERE id = ?
    `, [name, code, type || 'Sea Port', is_major ? 1 : 0, id]);
    res.json({ success: true, message: 'Port updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/ports/:id
router.delete('/ports/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM ports WHERE id = ?', [id]);
    res.json({ success: true, message: 'Port deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// PROCESSING & INFRASTRUCTURE MANAGEMENT
// ==========================================

// GET /api/admin/infrastructure
router.get('/infrastructure', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM infrastructure_items ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/infrastructure
router.post('/infrastructure', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { title, category, description, capacity, location, image, sort_order, is_active } = req.body;
    const [result] = await pool.query(`
      INSERT INTO infrastructure_items (
        title, category, description, capacity, location, image, sort_order, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [title, category || 'Processing Facility', description || '', capacity || '', location || 'Gujarat', image || '', sort_order || 0, is_active !== false ? 1 : 0]);
    res.status(201).json({ success: true, message: 'Facility item added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/infrastructure/:id
router.put('/infrastructure/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, capacity, location, image, sort_order, is_active } = req.body;
    await pool.query(`
      UPDATE infrastructure_items SET
        title = ?, category = ?, description = ?, capacity = ?, location = ?,
        image = ?, sort_order = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [title, category, description, capacity, location, image, sort_order || 0, is_active ? 1 : 0, id]);
    res.json({ success: true, message: 'Facility item updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/infrastructure/:id
router.delete('/infrastructure/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM infrastructure_items WHERE id = ?', [id]);
    res.json({ success: true, message: 'Facility item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// TRACEABILITY BATCHES & EXPORT LOTS
// ==========================================

// GET /api/admin/traceability
router.get('/traceability', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT tb.*, p.name as product_name
      FROM traceability_batches tb
      LEFT JOIN products p ON tb.product_id = p.id
      ORDER BY tb.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/traceability
router.post('/traceability', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const {
      batch_code, product_id, origin_region, harvest_date, processing_date,
      packing_date, inspection_status, certificate_of_analysis_no, packing_type,
      purity_percentage, moisture_percentage, container_number, port_of_loading,
      shipment_status, public_notes, is_active
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO traceability_batches (
        batch_code, product_id, origin_region, harvest_date, processing_date,
        packing_date, inspection_status, certificate_of_analysis_no, packing_type,
        purity_percentage, moisture_percentage, container_number, port_of_loading,
        shipment_status, public_notes, is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      batch_code, product_id || null, origin_region || 'Saurashtra, Gujarat',
      harvest_date || null, processing_date || null, packing_date || null,
      inspection_status || 'Passed Lab Audit', certificate_of_analysis_no || '',
      packing_type || '50 kg Jute Bags', purity_percentage || '99.5%',
      moisture_percentage || '7.5%', container_number || '', port_of_loading || 'Mundra Port',
      shipment_status || 'Customs Cleared', public_notes || '', is_active !== false ? 1 : 0
    ]);
    res.status(201).json({ success: true, message: 'Traceability lot registered', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/traceability/:id
router.put('/traceability/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      batch_code, product_id, origin_region, harvest_date, processing_date,
      packing_date, inspection_status, certificate_of_analysis_no, packing_type,
      purity_percentage, moisture_percentage, container_number, port_of_loading,
      shipment_status, public_notes, is_active
    } = req.body;

    await pool.query(`
      UPDATE traceability_batches SET
        batch_code = ?, product_id = ?, origin_region = ?, harvest_date = ?, processing_date = ?,
        packing_date = ?, inspection_status = ?, certificate_of_analysis_no = ?, packing_type = ?,
        purity_percentage = ?, moisture_percentage = ?, container_number = ?, port_of_loading = ?,
        shipment_status = ?, public_notes = ?, is_active = ?, updated_at = NOW()
      WHERE id = ?
    `, [
      batch_code, product_id || null, origin_region, harvest_date || null, processing_date || null,
      packing_date || null, inspection_status, certificate_of_analysis_no, packing_type,
      purity_percentage, moisture_percentage, container_number, port_of_loading,
      shipment_status, public_notes, is_active ? 1 : 0, id
    ]);
    res.json({ success: true, message: 'Traceability batch updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/traceability/:id
router.delete('/traceability/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM traceability_batches WHERE id = ?', [id]);
    res.json({ success: true, message: 'Traceability batch deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

