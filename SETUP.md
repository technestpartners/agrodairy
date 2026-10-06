# Local Development & Architecture Setup Guide
## Agro Dairy Export LLP — Production-Ready Laravel 12 Platform

Welcome to the **Agro Dairy Export LLP** commodity export platform. This codebase is fully engineered with Laravel 12, MySQL 8.4, Tailwind CSS, Alpine.js, DomPDF, and an advanced Request for Quotation (RFQ) CRM engine.

---

### 1. Quick Start / Local Setup

#### Step 1: Environment & Requirements
Ensure your environment has:
- PHP 8.2 or 8.3+ with `pdo_mysql`, `gd`, `bcmath`, `mbstring`, `fileinfo`
- MySQL 8.0+ or MariaDB running on port 3306
- Node.js 18+ & npm
- Composer 2.7+

#### Step 2: Configure Environment
Copy and verify your `.env` file:
```bash
cp .env.example .env
```
Ensure database credentials match your local MySQL server:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agrodairy
DB_USERNAME=root
DB_PASSWORD=
```

#### Step 3: Run Database Migrations & Seeders
Populate the 27 database tables with real agricultural commodity specifications, certified export categories, test batches, ports, and staff accounts:
```bash
php artisan migrate:fresh --seed --seeder=AgroExportSeeder
```

#### Step 4: Storage Link & Asset Compilation
```bash
php artisan storage:link
npm install
npm run build
```

#### Step 5: Start Local Servers
In terminal 1:
```bash
php artisan serve
```
In terminal 2 (if actively developing UI assets):
```bash
npm run dev
```

Visit the website in your browser: `http://localhost:8000`

---

### 2. Pre-Configured Test & Staff Accounts

All accounts use the password: `password123`

| Role | Email | Access Scope |
| :--- | :--- | :--- |
| **Super Admin** | `admin@agrodairy.com` | Full unrestricted access to all CMS, Products, Inquiries, Quotations, Certifications, Settings, and Audit Logs |
| **Sales Manager** | `sales@agrodairy.com` | Inquiry CRM pipeline, quotation creation, revisions, and DomPDF proforma generation |
| **Quality Manager** | `quality@agrodairy.com` | APEDA/FSSAI/ISO Certificate management, expiry alerts, and batch lot traceability records |
| **Content Editor** | `editor@agrodairy.com` | Products, specifications, category management, blogs, and market insights |

Admin login URL: `http://localhost:8000/admin/login` (or `/login`)

---

### 3. Verification & Automated Testing

To run the complete automated test suite verifying role middleware, calculator formulas, lot traceability lookups, PDF generation, and public routes:

```bash
php artisan test
```

Expected result:
```
PASS  Tests\Feature\AgroExportPlatformTest
✓ public pages load successfully
✓ product catalog and dynamic specifications display
✓ rfq inquiry submission and database persistence
✓ container and landed cost calculations
✓ traceability batch lookup
✓ inquiry status transition and notes crm workflow
✓ admin can login and access dashboard
✓ role based access control is enforced
✓ pdf generation service

Tests:    11 passed (54 assertions)
Duration: ~1.2s
```

---

### 4. Key Platform Features & Architecture

#### A. Dynamic Product Catalogue
- Sourced from Gujarat, India: Peanuts (Bold, Java, TJ, Blanched, In-shell), Sesame Seeds (Natural, Hulled, Black), Whole Spices (Cumin, Coriander, Fennel, Turmeric), Pulses, Chickpeas, Dehydrated Vegetables, and Animal Feed.
- Real lab parameters: Counts per ounce, Moisture %, Purity %, Admixture %, Aflatoxin ppb, Oil content, and FFA %.
- Auto-generates downloadable **Technical Specification PDF sheets** for every product.

#### B. Request for Quotation (RFQ) CRM Workflow
- Multi-step buyer RFQ form on `/request-quote` with validation and rate limiting.
- Admin inquiry assignment, internal team notes, follow-up scheduling, and multi-stage pipeline:
  `New` → `Reviewed` → `Assigned` → `Quotation Prepared` → `Quotation Sent` → `Negotiation` → `Accepted` / `Rejected` → `Completed`.
- Generates official, tamper-proof **DomPDF Proforma Quotations** with line items, Incoterms (FOB, CFR, CIF), port codes, payment milestones, and digital stamps.

#### C. Batch & Lot Traceability Portal (`/traceability`)
- Buyers can verify authenticated export lots using unique lot numbers:
  - Demo Lot 1: `AGRO-PN-2026-0814` (Export Bold Peanuts 40/50, Mundra Port)
  - Demo Lot 2: `AGRO-SS-2026-0922` (Premium Hulled Sesame 99.95%, Jebel Ali)
- Displays origin farmer cluster, sortex grading date, lab analysis parameters, customs bolt seal number, container reference, and phytosanitary certificate details.

#### D. Interactive Export Calculators (`/export-tools`)
- **Container Load Calculator:** Computes exact 20ft/40ft/40ft HC bag counts, tare allowance, total net/gross MT, and payload volume utilization for each commodity density.
- **Landed Cost Calculator:** Calculates FOB + Freight + Marine Insurance = CIF + Customs Duty + Port Terminal charges to determine total landed cost and per-kg landing price.
- **HS Code Tariff Directory:** Fast commodity search by HS tariff code (e.g., Peanuts: `1202.42`, Sesame: `1207.40`, Cumin: `0909.31`).
- **Crop Calendar:** Sowing, harvest, and export shipping seasons across Gujarat & Saurashtra.
- **Unit Converter:** Real-time conversion between Metric Tonnes, Kilograms, Pounds (lbs), Quintals, and Short/Long tons.
