const mysql = require('../node_modules/mysql2/promise');
const bcrypt = require('../node_modules/bcryptjs');

async function init() {
  console.log('🚀 Connecting to TiDB Cloud...');
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'j2114Exj9YtebhM.root',
    password: 'OeXzhwiNIK8eHCX1',
    database: 'agrodairy',
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });

  console.log('✓ Connected! Creating schema tables...');

  // 1. Users
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      email_verified_at TIMESTAMP NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'staff',
      phone VARCHAR(50) NULL,
      department VARCHAR(100) NULL,
      is_active BOOLEAN DEFAULT TRUE,
      remember_token VARCHAR(100) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 2. Audit logs
  await conn.query(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT NULL,
      action VARCHAR(100) NOT NULL,
      model_type VARCHAR(100) NULL,
      model_id BIGINT NULL,
      details TEXT NULL,
      ip_address VARCHAR(45) NULL,
      user_agent TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_audit (model_type, model_id)
    );
  `);

  // 3. Product Categories
  await conn.query(`
    CREATE TABLE IF NOT EXISTS product_categories (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      parent_id BIGINT NULL,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT NULL,
      description LONGTEXT NULL,
      image VARCHAR(255) NULL,
      icon VARCHAR(100) NULL,
      hs_code_prefix VARCHAR(10) NULL,
      is_featured BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 4. Products
  await conn.query(`
    CREATE TABLE IF NOT EXISTS products (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      category_id BIGINT NOT NULL,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      sku VARCHAR(100) NULL UNIQUE,
      short_description TEXT NULL,
      description LONGTEXT NULL,
      origin VARCHAR(255) DEFAULT 'Gujarat, India',
      grade_variety VARCHAR(255) NULL,
      hs_code VARCHAR(20) NULL,
      moq DECIMAL(12, 2) DEFAULT 1.00,
      moq_unit VARCHAR(100) DEFAULT 'Metric Ton (MT)',
      available_quantity VARCHAR(255) NULL,
      shelf_life VARCHAR(255) NULL,
      storage_conditions VARCHAR(255) NULL,
      packaging_summary TEXT NULL,
      loading_summary TEXT NULL,
      spec_sheet_pdf VARCHAR(255) NULL,
      main_image VARCHAR(255) NULL,
      is_featured BOOLEAN DEFAULT FALSE,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      meta_keywords VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category_active (category_id, is_active)
    );
  `);

  // 5. Product Images
  await conn.query(`
    CREATE TABLE IF NOT EXISTS product_images (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      product_id BIGINT NOT NULL,
      image_path VARCHAR(255) NOT NULL,
      caption VARCHAR(255) NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 6. Product Specifications
  await conn.query(`
    CREATE TABLE IF NOT EXISTS product_specifications (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      product_id BIGINT NOT NULL,
      spec_group VARCHAR(100) DEFAULT 'Physical Parameters',
      parameter VARCHAR(255) NOT NULL,
      value VARCHAR(255) NOT NULL,
      unit VARCHAR(50) NULL,
      test_method VARCHAR(100) NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_prod_spec (product_id, spec_group)
    );
  `);

  // 7. Packaging Types
  await conn.query(`
    CREATE TABLE IF NOT EXISTS packaging_types (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      material VARCHAR(255) NULL,
      capacity_options VARCHAR(255) NULL,
      description TEXT NULL,
      image VARCHAR(255) NULL,
      is_bulk BOOLEAN DEFAULT FALSE,
      is_vacuum BOOLEAN DEFAULT FALSE,
      is_private_label BOOLEAN DEFAULT TRUE,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 8. Certifications
  await conn.query(`
    CREATE TABLE IF NOT EXISTS certifications (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      certificate_no VARCHAR(255) NULL,
      issuing_body VARCHAR(255) NOT NULL,
      issue_date DATE NULL,
      expiry_date DATE NULL,
      file_path VARCHAR(255) NULL,
      image_path VARCHAR(255) NULL,
      verification_url VARCHAR(255) NULL,
      status VARCHAR(50) DEFAULT 'active',
      description TEXT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 9. Quality Documents
  await conn.query(`
    CREATE TABLE IF NOT EXISTS quality_documents (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      document_type VARCHAR(100) DEFAULT 'Standard Operating Procedure',
      description TEXT NULL,
      file_path VARCHAR(255) NULL,
      is_public BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 10. Traceability Batches
  await conn.query(`
    CREATE TABLE IF NOT EXISTS traceability_batches (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      batch_code VARCHAR(100) NOT NULL UNIQUE,
      product_id BIGINT NOT NULL,
      origin_region VARCHAR(255) DEFAULT 'Saurashtra, Gujarat, India',
      harvest_date DATE NULL,
      processing_date DATE NULL,
      packing_date DATE NULL,
      inspection_status VARCHAR(255) DEFAULT 'Passed QA Clearance',
      certificate_of_analysis_no VARCHAR(255) NULL,
      coa_file_path VARCHAR(255) NULL,
      packing_type VARCHAR(255) NULL,
      purity_percentage VARCHAR(50) NULL,
      moisture_percentage VARCHAR(50) NULL,
      container_number VARCHAR(100) NULL,
      port_of_loading VARCHAR(255) DEFAULT 'Mundra Port / Kandla Port, Gujarat',
      shipment_status VARCHAR(100) DEFAULT 'Quality Approved',
      public_notes TEXT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 11. Export Markets
  await conn.query(`
    CREATE TABLE IF NOT EXISTS export_markets (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NULL,
      icon VARCHAR(100) NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 12. Countries
  await conn.query(`
    CREATE TABLE IF NOT EXISTS countries (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      export_market_id BIGINT NOT NULL,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      code VARCHAR(10) NULL,
      flag_emoji VARCHAR(10) NULL,
      primary_ports TEXT NULL,
      import_regulations_summary TEXT NULL,
      required_documents_summary TEXT NULL,
      popular_products_summary TEXT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 13. Ports
  await conn.query(`
    CREATE TABLE IF NOT EXISTS ports (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      country_id BIGINT NULL,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(20) NULL,
      type VARCHAR(50) DEFAULT 'Discharge',
      is_major BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 14. Inquiries
  await conn.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      inquiry_number VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255) NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      whatsapp VARCHAR(100) NULL,
      country VARCHAR(100) NOT NULL,
      product_id BIGINT NULL,
      product_variant VARCHAR(255) NULL,
      quantity DECIMAL(14, 2) NULL,
      unit VARCHAR(50) DEFAULT 'Metric Ton (MT)',
      packaging_preference VARCHAR(255) NULL,
      destination_port VARCHAR(255) NULL,
      incoterm VARCHAR(50) DEFAULT 'FOB',
      target_price DECIMAL(14, 2) NULL,
      target_currency VARCHAR(10) DEFAULT 'USD',
      preferred_delivery_date DATE NULL,
      message TEXT NOT NULL,
      attachment_path VARCHAR(255) NULL,
      status VARCHAR(50) DEFAULT 'new',
      assigned_to BIGINT NULL,
      ip_address VARCHAR(45) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_inq_status (status, created_at)
    );
  `);

  // 15. Inquiry Notes
  await conn.query(`
    CREATE TABLE IF NOT EXISTS inquiry_notes (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      inquiry_id BIGINT NOT NULL,
      user_id BIGINT NOT NULL,
      note TEXT NOT NULL,
      type VARCHAR(50) DEFAULT 'internal',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 16. Inquiry Status History
  await conn.query(`
    CREATE TABLE IF NOT EXISTS inquiry_status_histories (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      inquiry_id BIGINT NOT NULL,
      user_id BIGINT NULL,
      from_status VARCHAR(50) NOT NULL,
      to_status VARCHAR(50) NOT NULL,
      comment TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 17. Quotations
  await conn.query(`
    CREATE TABLE IF NOT EXISTS quotations (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      quotation_number VARCHAR(100) NOT NULL UNIQUE,
      inquiry_id BIGINT NULL,
      created_by BIGINT NOT NULL,
      currency VARCHAR(10) DEFAULT 'USD',
      incoterm VARCHAR(50) DEFAULT 'CIF',
      origin_port VARCHAR(255) DEFAULT 'Mundra Port, Gujarat, India',
      destination_port VARCHAR(255) NOT NULL,
      payment_terms VARCHAR(255) DEFAULT '30% Advance T/T, 70% against BL copy',
      valid_until DATE NOT NULL,
      subtotal DECIMAL(14, 2) DEFAULT 0.00,
      freight DECIMAL(14, 2) DEFAULT 0.00,
      insurance DECIMAL(14, 2) DEFAULT 0.00,
      other_charges DECIMAL(14, 2) DEFAULT 0.00,
      grand_total DECIMAL(14, 2) DEFAULT 0.00,
      status VARCHAR(50) DEFAULT 'draft',
      revision_number INT DEFAULT 1,
      terms_and_conditions TEXT NULL,
      notes TEXT NULL,
      pdf_path VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 18. Quotation Items
  await conn.query(`
    CREATE TABLE IF NOT EXISTS quotation_items (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      quotation_id BIGINT NOT NULL,
      product_id BIGINT NULL,
      item_name VARCHAR(255) NOT NULL,
      grade_spec VARCHAR(255) NULL,
      packaging VARCHAR(255) NULL,
      quantity DECIMAL(14, 2) NOT NULL,
      unit VARCHAR(50) DEFAULT 'MT',
      unit_price DECIMAL(14, 2) NOT NULL,
      total_price DECIMAL(14, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 19. Blog Categories
  await conn.query(`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 20. Blogs
  await conn.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      category_id BIGINT NOT NULL,
      author_id BIGINT NULL,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT NULL,
      content LONGTEXT NOT NULL,
      featured_image VARCHAR(255) NULL,
      is_published BOOLEAN DEFAULT TRUE,
      published_at TIMESTAMP NULL,
      views_count BIGINT DEFAULT 0,
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 21. FAQs
  await conn.query(`
    CREATE TABLE IF NOT EXISTS faqs (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      question VARCHAR(255) NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(50) DEFAULT 'general',
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 22. Testimonials
  await conn.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      company_name VARCHAR(255) NULL,
      country VARCHAR(100) NOT NULL,
      rating INT DEFAULT 5,
      content TEXT NOT NULL,
      avatar VARCHAR(255) NULL,
      is_featured BOOLEAN DEFAULT TRUE,
      is_active BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 23. Team Members
  await conn.query(`
    CREATE TABLE IF NOT EXISTS team_members (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      bio TEXT NULL,
      image VARCHAR(255) NULL,
      email VARCHAR(255) NULL,
      linkedin VARCHAR(255) NULL,
      sort_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 24. Infrastructure Items
  await conn.query(`
    CREATE TABLE IF NOT EXISTS infrastructure_items (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) DEFAULT 'processing',
      description TEXT NOT NULL,
      capacity VARCHAR(255) NULL,
      location VARCHAR(255) NULL,
      image VARCHAR(255) NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 25. Crop Calendars
  await conn.query(`
    CREATE TABLE IF NOT EXISTS crop_calendars (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      crop_name VARCHAR(255) NOT NULL,
      category VARCHAR(100) DEFAULT 'Oil Seeds',
      sowing_start VARCHAR(100) NOT NULL,
      sowing_end VARCHAR(100) NOT NULL,
      harvest_start VARCHAR(100) NOT NULL,
      harvest_end VARCHAR(100) NOT NULL,
      peak_export_start VARCHAR(100) NOT NULL,
      peak_export_end VARCHAR(100) NOT NULL,
      major_states VARCHAR(255) DEFAULT 'Gujarat, Rajasthan',
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 26. HS Codes
  await conn.query(`
    CREATE TABLE IF NOT EXISTS hs_codes (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      hs_code VARCHAR(20) NOT NULL UNIQUE,
      product_name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      gst_export_incentive VARCHAR(255) NULL,
      standard_description TEXT NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 27. Newsletter Subscribers
  await conn.query(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      is_active BOOLEAN DEFAULT TRUE,
      ip_address VARCHAR(45) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // 28. Settings
  await conn.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      \`key\` VARCHAR(255) NOT NULL UNIQUE,
      \`value\` TEXT NULL,
      \`group\` VARCHAR(50) DEFAULT 'general',
      label VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  console.log('✓ All 28 database tables successfully created in TiDB!');

  // Seed default Admin user
  const hashedPassword = await bcrypt.hash('password123', 10);
  await conn.query(`
    INSERT INTO users (name, email, password, role, phone, department, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, 1, NOW(), NOW())
    ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password), role = VALUES(role), updated_at = NOW();
  `, ['Managing Director', 'admin@agrodairy.com', hashedPassword, 'super_admin', '+91 90233 63680', 'Executive Board']);

  console.log('✓ Default admin user seeded: admin@agrodairy.com (password: password123)');

  await conn.end();
}

init().catch(err => {
  console.error('Error during init:', err);
  process.exit(1);
});
