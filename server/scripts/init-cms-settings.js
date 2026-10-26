const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const pool = require('../db');

async function setup() {
  console.log('--- Initializing CMS Settings and Gallery Database Tables ---');

  // 1. Create gallery_items table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      category_slug VARCHAR(100) DEFAULT 'general',
      image VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      badge VARCHAR(100),
      specs VARCHAR(255),
      description TEXT,
      sort_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('✓ gallery_items table ready');

  // 2. Check and seed gallery_items
  // 2. Check and seed gallery_items from galleryData.js
  const [existingGallery] = await pool.query('SELECT COUNT(*) as cnt FROM gallery_items');
  if (existingGallery[0].cnt < 60) {
    await pool.query('DELETE FROM gallery_items');
    const fs = require('fs');
    const fileContent = fs.readFileSync(path.join(__dirname, '../../client/src/data/galleryData.js'), 'utf8');
    const itemsMatch = fileContent.match(/export const GALLERY_ITEMS = (\[[\s\S]*?\]);/);
    const items = eval(itemsMatch[1]);
    for (const item of items) {
      const catSlug = item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await pool.query(`
        INSERT INTO gallery_items (id, title, category, category_slug, image, location, badge, specs, description, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      `, [item.id, item.title, item.category, catSlug, item.image, item.location || 'Gujarat, India', 'Export Verified', 'Sortex Cleaned • Lab Certified', item.desc || '', item.id]);
    }
    console.log(`✓ Seeded ${items.length} verified gallery_items from official WhatsApp photo collection`);
  }

  // 3. Populate / synchronize default website settings
  const defaultSettings = [
    // Header & Top Bar
    ['header_ticker', 'Mundra, Kandla & Hazira Seaport Direct Dispatches', 'header', 'Top Bar Dispatch Ticker'],
    ['header_credentials_badge', 'APEDA • FSSAI • DGFT IEC: 0817029381', 'header', 'Header Credentials Badge'],
    ['header_hotline_phone', '+91 90233 63680', 'header', 'Hotline Phone Number'],
    ['header_contact_person', 'J.P. Vora', 'header', 'Contact Person Name'],
    ['header_primary_email', 'agrodairyexportllp@gmail.com', 'header', 'Primary Contact Email'],
    ['header_whatsapp', '+919023363680', 'header', 'WhatsApp Number'],
    ['header_cta_text', 'Get a Quote', 'header', 'Header Button Label'],
    ['header_cta_link', '/rfq', 'header', 'Header Button Link'],

    // Hero Section
    ['hero_badge', 'DIRECT AGRO & DAIRY EXPORTER FROM GUJARAT, INDIA', 'hero', 'Hero Top Badge'],
    ['hero_title_line1', "Exporting India's Finest", 'hero', 'Hero Title Line 1'],
    ['hero_title_highlight', 'Oilseeds, Grains & Pure Dairy Ghee', 'hero', 'Hero Title Highlighted Part'],
    ['hero_description', 'Agro Dairy Export LLP is an Indian agricultural and dairy export house based in Surat, Gujarat. Operating directly from Mundra and Hazira seaports, we supply Sortex-cleaned peanuts, sesame seeds, grains, pulses, and pure Indian cow & buffalo ghee to commercial buyers worldwide.', 'hero', 'Hero Subtitle / Description'],
    ['hero_cta_primary_text', 'Request Proforma Quote', 'hero', 'Hero Primary Button Text'],
    ['hero_cta_primary_link', '/rfq', 'hero', 'Hero Primary Button Link'],
    ['hero_cta_secondary_text', 'Explore Export Catalog', 'hero', 'Hero Secondary Button Text'],
    ['hero_cta_secondary_link', '/products', 'hero', 'Hero Secondary Button Link'],
    ['hero_stat1_value', '45+', 'hero', 'Hero Metric 1 Value'],
    ['hero_stat1_label', 'Destination Countries', 'hero', 'Hero Metric 1 Label'],
    ['hero_stat2_value', '99.5%+', 'hero', 'Hero Metric 2 Value'],
    ['hero_stat2_label', 'Buhler Sortex Purity', 'hero', 'Hero Metric 2 Label'],
    ['hero_stat3_value', '24/7', 'hero', 'Hero Metric 3 Value'],
    ['hero_stat3_label', 'Direct Port Clearance', 'hero', 'Hero Metric 3 Label'],
    ['hero_stat4_value', 'FSSAI & APEDA', 'hero', 'Hero Metric 4 Value'],
    ['hero_stat4_label', 'Govt Registered Exporter', 'hero', 'Hero Metric 4 Label'],

    // Company & Legal Credentials
    ['company_name', 'Agro Dairy Export LLP', 'general', 'Company Legal Name'],
    ['tagline', 'Premier Exporter of Pure Dairy Ghee & Agricultural Commodities from Gujarat to Global Markets', 'general', 'Company Tagline'],
    ['iec_code', '0817029381', 'general', 'DGFT IEC Code'],
    ['gstin', '24AAHFA3928L1Z9', 'general', 'GSTIN Registration'],
    ['fssai_licence', '10722026000148', 'general', 'FSSAI Central Export License'],
    ['apeda_rcmc', 'APEDA/RCMC/2026/0892', 'general', 'APEDA RCMC Certificate'],
    ['head_office_address', 'Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India', 'contact', 'Head Office Address'],
    ['loading_ports', 'Mundra Port (INMUN), Kandla Port (INIXY), Hazira Port (INHAZ), Pipavav Port, Gujarat, India', 'general', 'Gateway Exit Ports'],

    // About Section
    ['about_badge', 'INDIAN AGRO & DAIRY TRADING HOUSE', 'about', 'About Section Badge'],
    ['about_headline', 'Reliable Portside Aggregation, Modern Optical Cleaning & Certified Container Stuffing', 'about', 'About Section Headline'],
    ['about_paragraph1', 'Established in Gujarat, Agro Dairy Export LLP bridges fertile farm belts across Saurashtra with commercial food importers in the Gulf, Africa, Europe, and Southeast Asia.', 'about', 'About Section Paragraph 1'],
    ['about_paragraph2', 'We maintain rigorous quality governance through Buhler optical color sorters, independent SGS/Geo-Chem Certificate of Analysis (COA), and dedicated container stuffing at Mundra and Hazira ports.', 'about', 'About Section Paragraph 2'],

    // Footer
    ['footer_about', 'Agro Dairy Export LLP is an Indian agricultural and dairy export company operating from Surat and Rajkot, Gujarat. Direct bulk supplier to commercial buyers across GCC, Southeast Asia, Europe, and Africa.', 'footer', 'Footer About Summary'],
    ['footer_hours', 'Mon - Sat: 9:00 AM - 7:00 PM IST | Port Operations: 24/7 Continuous', 'footer', 'Operating & Port Hours'],
    ['footer_disclaimer', 'All agricultural commodities and pure dairy ghee shipments are exported under phytosanitary inspection, independent laboratory Certificate of Analysis (COA), and methyl bromide fumigation standards.', 'footer', 'Footer Export Disclaimer']
  ];

  for (const [key, value, group, label] of defaultSettings) {
    await pool.query(`
      INSERT INTO settings (\`key\`, \`value\`, \`group\`, \`label\`, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE \`group\` = VALUES(\`group\`), \`label\` = VALUES(\`label\`), updated_at = NOW()
    `, [key, value, group, label]);
  }
  console.log(`✓ Synchronized ${defaultSettings.length} website settings`);

  console.log('--- CMS Setup Completed Successfully ---');
  process.exit(0);
}

setup().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
