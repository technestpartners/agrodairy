const mysql = require('../node_modules/mysql2/promise');

async function seedMetadata() {
  console.log('🌱 Seeding metadata (certifications, packaging, markets, blogs, faqs, etc.)...');
  const conn = await mysql.createConnection({
    host: 'gateway01.ap-northeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'j2114Exj9YtebhM.root',
    password: 'OeXzhwiNIK8eHCX1',
    database: 'agrodairy',
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });

  // 1. Packaging Types
  const packaging = [
    { name: 'PP Woven Bags', slug: 'pp-woven-bags', material: 'Virgin Polypropylene with PE liner', capacity_options: '25 kg, 50 kg', description: 'Tough, moisture-resistant bags standard for peanut, sesame, and pulse exports.', image: '/images/packaging/pp-bag.jpg', is_bulk: 0, is_vacuum: 0, is_private_label: 1, sort_order: 1 },
    { name: 'Natural Jute / Burlap Bags', slug: 'jute-bags', material: '100% Eco-friendly Biodegradable Natural Indian Jute', capacity_options: '25 kg, 50 kg', description: 'Breathable natural fibers preventing condensation sweating during ocean transit.', image: '/images/packaging/jute-bag.jpg', is_bulk: 0, is_vacuum: 0, is_private_label: 1, sort_order: 2 },
    { name: 'Vacuum Packs in Corrugated Cartons', slug: 'vacuum-packs', material: 'Multi-layer high-barrier vacuum pouch + 5-ply carton', capacity_options: '10 kg, 25 kg', description: 'High barrier protection eliminating oxygen to preserve aroma and stop infestation.', image: '/images/packaging/vacuum.jpg', is_bulk: 0, is_vacuum: 1, is_private_label: 1, sort_order: 3 },
    { name: 'Big Jumbo Bags (FIBC)', slug: 'fibc-jumbo-bags', material: 'UV-stabilized PP Woven fabric with lifting loops', capacity_options: '1000 kg, 1250 kg (1 MT)', description: 'Heavy-duty industrial bulk bags for direct factory discharge into silos.', image: '/images/packaging/jumbo-bag.jpg', is_bulk: 1, is_vacuum: 0, is_private_label: 0, sort_order: 4 },
    { name: 'Multi-wall Kraft Paper Bags', slug: 'kraft-paper-bags', material: '3-ply natural Kraft paper with inner sealed PE barrier', capacity_options: '20 kg, 25 kg', description: 'Preferred packaging for Hulled Sesame Seeds and Dehydrated Vegetables.', image: '/images/packaging/paper-bag.jpg', is_bulk: 0, is_vacuum: 0, is_private_label: 1, sort_order: 5 }
  ];
  for (const p of packaging) {
    await conn.query(`
      INSERT INTO packaging_types (name, slug, material, capacity_options, description, image, is_bulk, is_vacuum, is_private_label, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE name=VALUES(name), material=VALUES(material), description=VALUES(description), updated_at=NOW();
    `, [p.name, p.slug, p.material, p.capacity_options, p.description, p.image, p.is_bulk, p.is_vacuum, p.is_private_label, p.sort_order]);
  }
  console.log('✓ Packaging types seeded');

  // 2. Certifications
  const certs = [
    { title: 'APEDA Registration', slug: 'apeda-registration', certificate_no: 'RCMC/AGRO/2026/0892', issuing_body: 'Agricultural and Processed Food Products Export Development Authority (Ministry of Commerce, Govt. of India)', issue_date: '2024-04-01', expiry_date: '2029-03-31', status: 'active', description: 'Authorized registered exporter for scheduled agricultural products from India.', verification_url: 'https://apeda.gov.in', sort_order: 1 },
    { title: 'FSSAI Central Licence', slug: 'fssai-central-licence', certificate_no: '10722026000148', issuing_body: 'Food Safety and Standards Authority of India', issue_date: '2023-08-15', expiry_date: '2028-08-14', status: 'active', description: 'Central Food Authority manufacturing and export authorization verifying hygiene.', verification_url: 'https://foscos.fssai.gov.in', sort_order: 2 },
    { title: 'ISO 22000:2018 (FSMS)', slug: 'iso-22000-food-safety', certificate_no: 'FSMS-IN-2024-9182', issuing_body: 'TUV SUD International Certification', issue_date: '2024-01-10', expiry_date: '2027-01-09', status: 'active', description: 'International standard for food safety management systems across food processing, sorting, and packaging.', verification_url: 'https://www.iso.org', sort_order: 3 },
    { title: 'HACCP Hazard Analysis', slug: 'haccp-certification', certificate_no: 'HACCP-AG-88210', issuing_body: 'Bureau Veritas Quality International', issue_date: '2024-02-01', expiry_date: '2027-01-31', status: 'active', description: 'Systematic preventative approach to biological, chemical, and physical hazards in food.', verification_url: 'https://www.bureauveritas.com', sort_order: 4 },
    { title: 'Spices Board of India (CRES)', slug: 'spices-board-registration', certificate_no: 'SPICES/EX/2026/0412', issuing_body: 'Spices Board of India (Govt. of India)', issue_date: '2023-11-01', expiry_date: '2026-10-31', status: 'active', description: 'Certificate of Registration as Exporter of Spices ensuring spice cleaning and quality.', verification_url: 'https://www.indianspices.com', sort_order: 5 },
    { title: 'US FDA Registered Facility', slug: 'us-fda-registration', certificate_no: 'FDA-FEI-1982736410', issuing_body: 'U.S. Food and Drug Administration', issue_date: '2024-10-01', expiry_date: '2026-12-31', status: 'active', description: 'Foreign facility registered for legal importation into the United States under FSMA.', verification_url: 'https://www.fda.gov', sort_order: 6 },
    { title: 'Halal India Certification', slug: 'halal-certification', certificate_no: 'HALAL-IN-98124', issuing_body: 'Halal India Authority (JAKIM & MUI accredited)', issue_date: '2024-05-01', expiry_date: '2027-04-30', status: 'active', description: 'Certified 100% Halal compliant for consumption in Islamic markets.', verification_url: 'https://halalindia.co.in', sort_order: 7 },
    { title: 'Kosher International', slug: 'kosher-certification', certificate_no: 'KOSH-2024-5519', issuing_body: 'Kosher Certification Services', issue_date: '2024-03-01', expiry_date: '2027-02-28', status: 'active', description: 'Certified Kosher Pareve year-round for international food processors.', verification_url: 'https://oukosher.org', sort_order: 8 }
  ];
  for (const c of certs) {
    await conn.query(`
      INSERT INTO certifications (title, slug, certificate_no, issuing_body, issue_date, expiry_date, status, description, verification_url, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())
      ON DUPLICATE KEY UPDATE title=VALUES(title), certificate_no=VALUES(certificate_no), issuing_body=VALUES(issuing_body), updated_at=NOW();
    `, [c.title, c.slug, c.certificate_no, c.issuing_body, c.issue_date, c.expiry_date, c.status, c.description, c.verification_url, c.sort_order]);
  }
  console.log('✓ Certifications seeded');

  // 3. Quality Documents
  const qDocs = [
    { title: 'Corporate Quality Assurance Policy & Zero-Adulteration Charter', document_type: 'Corporate Policy', description: 'Our guiding quality framework detailing farm procurement audits, sampling standards, optical sorting benchmarks, and customer commitments.', sort_order: 1 },
    { title: 'Standard Operating Procedure (SOP) — Optical Color Sorting & Destoning', document_type: 'Standard Operating Procedure', description: 'Operational parameters for Buhler Sortex optical sorting cameras, infrared sensors, and magnetic separator maintenance.', sort_order: 2 },
    { title: 'Laboratory Protocol for Aflatoxin Testing via HPLC', document_type: 'Testing Protocol', description: 'Validated protocol for measuring B1, B2, G1, and G2 mycotoxin levels per AOAC 991.31 and European Commission Regulation (EC) 1881/2006.', sort_order: 3 },
    { title: 'Pre-Shipment Container Inspection & Phytosanitary Protocol', document_type: 'Export Protocol', description: '12-point inspection check verifying container flooring dryness, smell absence, ventilation taping, and silica gel desiccant bags.', sort_order: 4 }
  ];
  for (const q of qDocs) {
    await conn.query(`
      INSERT INTO quality_documents (title, document_type, description, is_public, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE description=VALUES(description), updated_at=NOW();
    `, [q.title, q.document_type, q.description, q.sort_order]);
  }
  console.log('✓ Quality documents seeded');

  // 4. Export Markets & Countries
  const markets = [
    {
      name: 'Middle East & GCC', slug: 'middle-east', description: 'Premier destination for Indian Peanuts, Sesame, and Spices with direct sea routing from Mundra Port to Dubai, Dammam, and Muscat.', icon: 'globe', sort_order: 1,
      countries: [
        { name: 'United Arab Emirates', slug: 'uae', code: 'AE', flag_emoji: '🇦🇪', primary_ports: 'Jebel Ali Port (Dubai), Khalifa Port, Sharjah Port', import_regulations_summary: 'Dubai Municipality and MOCCAE clearance required. Phytosanitary certificate, Certificate of Origin, and Halal mandatory.', required_documents_summary: 'Commercial Invoice, Packing List, Bill of Lading, Phytosanitary Certificate, Certificate of Origin, Health Certificate.', popular_products_summary: 'Bold Peanuts 40/50, Hulled Sesame Seeds 99.98%, Cumin Seeds, Kabuli Chickpeas.', sort_order: 1 },
        { name: 'Saudi Arabia', slug: 'saudi-arabia', code: 'SA', flag_emoji: '🇸🇦', primary_ports: 'Jeddah Islamic Port, King Abdulaziz Port (Dammam)', import_regulations_summary: 'SFDA regulations apply. FAPIS pre-clearance and Saber platform compliance.', required_documents_summary: 'Commercial Invoice (Attested), Packing List, Clean On-Board B/L, SFDA Health Certificate, Halal Certificate.', popular_products_summary: 'Java Peanuts, Cumin Seeds, Turmeric, Chickpeas, Dehydrated Onion.', sort_order: 2 }
      ]
    },
    {
      name: 'European Union & UK', slug: 'europe', description: 'Strict quality compliance market focusing on low aflatoxin, pesticide residue limits (MRL), and organic/HACCP certifications.', icon: 'shield-check', sort_order: 2,
      countries: [
        { name: 'Netherlands', slug: 'netherlands', code: 'NL', flag_emoji: '🇳🇱', primary_ports: 'Port of Rotterdam, Port of Amsterdam', import_regulations_summary: 'EFSA regulations. Aflatoxin must strictly be below 4 ppb Total (2 ppb B1). Full pesticide screening per EC 396/2005.', required_documents_summary: 'Bill of Lading, Commercial Invoice, Packing List, Phytosanitary Certificate with official annex, EU Health Certificate, Eurofins/SGS Test Report.', popular_products_summary: 'Hulled Sesame Seeds (Auto-Sortex), Blanched Peanuts, Cumin Seeds.', sort_order: 1 },
        { name: 'United Kingdom', slug: 'united-kingdom', code: 'GB', flag_emoji: '🇬🇧', primary_ports: 'Port of Felixstowe, London Gateway, Southampton', import_regulations_summary: 'UK FSA requirements. IPAFFS notification mandatory before vessel arrival.', required_documents_summary: 'Bill of Lading, Commercial Invoice, Packing List, Health Certificate, Certificate of Analysis.', popular_products_summary: 'Bold Peanuts, Sesame Seeds, Coriander Seeds, Ground Spices.', sort_order: 2 }
      ]
    },
    {
      name: 'Southeast & East Asia', slug: 'asia', description: 'Fast-growing consumer markets importing high volumes of oilseeds, whole mung beans, and animal feed.', icon: 'trending-up', sort_order: 3,
      countries: [
        { name: 'Vietnam', slug: 'vietnam', code: 'VN', flag_emoji: '🇻🇳', primary_ports: 'Haiphong Port, Cat Lai Port (Ho Chi Minh City), Da Nang', import_regulations_summary: 'Plant Protection Department (PPD) clearance. Fumigation certificate and weed seed free declaration required.', required_documents_summary: 'Bill of Lading, Commercial Invoice, Packing List, Phytosanitary Certificate, Fumigation Certificate.', popular_products_summary: 'Bold Peanuts, Whole Green Moong, Yellow Corn, Animal Feed.', sort_order: 1 },
        { name: 'Indonesia', slug: 'indonesia', code: 'ID', flag_emoji: '🇮🇩', primary_ports: 'Tanjung Priok (Jakarta), Tanjung Perak (Surabaya)', import_regulations_summary: 'Barantan Agricultural Quarantine Agency compliance. Halal BPJPH recognition.', required_documents_summary: 'Commercial Invoice, Packing List, Bill of Lading, Prior Notice Barantan, Phytosanitary Certificate, COA.', popular_products_summary: 'Groundnuts, Sesame Seeds, Soybean Meal.', sort_order: 2 }
      ]
    }
  ];

  for (const m of markets) {
    let marketId;
    const [existM] = await conn.query('SELECT id FROM export_markets WHERE slug = ?', [m.slug]);
    if (existM.length > 0) {
      marketId = existM[0].id;
    } else {
      const [insM] = await conn.query(`
        INSERT INTO export_markets (name, slug, description, icon, sort_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `, [m.name, m.slug, m.description, m.icon, m.sort_order]);
      marketId = insM.insertId;
    }

    for (const c of m.countries) {
      await conn.query(`
        INSERT INTO countries (export_market_id, name, slug, code, flag_emoji, primary_ports, import_regulations_summary, required_documents_summary, popular_products_summary, is_active, sort_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE name=VALUES(name), flag_emoji=VALUES(flag_emoji), primary_ports=VALUES(primary_ports), updated_at=NOW();
      `, [marketId, c.name, c.slug, c.code, c.flag_emoji, c.primary_ports, c.import_regulations_summary, c.required_documents_summary, c.popular_products_summary, c.sort_order]);
    }
  }
  console.log('✓ Export markets & countries seeded');

  // 5. Ports
  const ports = [
    { name: 'Mundra Port (INMUN), Gujarat', code: 'INMUN', type: 'Loading', is_major: 1 },
    { name: 'Kandla / Deendayal Port (INIXY), Gujarat', code: 'INIXY', type: 'Loading', is_major: 1 },
    { name: 'Pipavav Port (INPAV), Gujarat', code: 'INPAV', type: 'Loading', is_major: 1 },
    { name: 'Nhava Sheva / JNPT (INNSA), Maharashtra', code: 'INNSA', type: 'Loading', is_major: 1 }
  ];
  for (const p of ports) {
    await conn.query(`
      INSERT INTO ports (name, code, type, is_major, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE code=VALUES(code), type=VALUES(type), updated_at=NOW();
    `, [p.name, p.code, p.type, p.is_major]);
  }
  console.log('✓ Ports seeded');

  // 6. FAQs
  const faqs = [
    { question: 'What is the Minimum Order Quantity (MOQ) for export shipments?', answer: 'Our standard Minimum Order Quantity (MOQ) is one 20-foot Full Container Load (FCL), which typically accommodates 19 to 24 Metric Tons depending on product density and packaging type.', category: 'export', sort_order: 1 },
    { question: 'Which Incoterms do you offer for international contracts?', answer: 'We routinely quote on FOB (Free On Board - Mundra Port / Kandla Port), CFR (Cost and Freight - Port of Destination), and CIF (Cost, Insurance and Freight - Destination Port). We can also quote EXW for clients who manage ocean logistics.', category: 'payment', sort_order: 2 },
    { question: 'What payment terms are accepted for new and existing buyers?', answer: 'Standard payment terms for new accounts are: 1) 30% Advance T/T upon order confirmation, balance 70% against emailed scanned copies of original Bill of Lading, Phytosanitary, and Invoice. 2) Irrevocable, Confirmed L/C at Sight from a Tier-1 international bank.', category: 'payment', sort_order: 3 },
    { question: 'How do you guarantee and control Aflatoxin levels in peanuts?', answer: 'Aflatoxin control begins at the farm level through regulated moisture harvesting. In our plant, peanuts undergo precision mechanical cleaning, aspirating, and dual Buhler optical color sorting. Every batch is tested via HPLC-FLD and verified by SGS or Eurofins (< 4 ppb EU standard).', category: 'quality', sort_order: 4 },
    { question: 'Can you accommodate customized or Private Label packaging with our brand design?', answer: 'Yes. We provide complete Private Label (OEM) packaging services. We can print your brand logo, regulatory artwork, barcode, and language translations onto 25kg / 50kg bags, vacuum packs, or consumer jars.', category: 'packaging', sort_order: 5 },
    { question: 'What export documentation accompanies every shipment?', answer: 'Every export consignment is shipped with: 1) Commercial Invoice, 2) Detailed Packing List, 3) Original Bill of Lading (3/3), 4) Phytosanitary Certificate, 5) Certificate of Origin, 6) Certificate of Analysis (COA), 7) Fumigation Certificate, and 8) Halal Certificate.', category: 'export', sort_order: 6 }
  ];
  for (const f of faqs) {
    await conn.query(`
      INSERT INTO faqs (question, answer, category, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE answer=VALUES(answer), updated_at=NOW();
    `, [f.question, f.answer, f.category, f.sort_order]);
  }
  console.log('✓ FAQs seeded');

  // 7. Testimonials
  const testimonials = [
    { client_name: 'Tariq Al-Mansoor', company_name: 'Gulf Food Trading LLC', country: 'Dubai, United Arab Emirates', rating: 5, content: 'We have been importing Bold Peanuts and Natural Sesame Seeds from Agro Dairy Export LLP for over 3 years into Jebel Ali. The quality has remained consistently top tier with zero container moisture issues.', sort_order: 1 },
    { client_name: 'Jan Van Der Meer', company_name: 'Rotterdam Commodities B.V.', country: 'Netherlands', rating: 5, content: 'Sourcing hulled sesame seeds compliant with stringent EU pesticide and aflatoxin limits used to be challenging. Agro Dairy Export LLP provides Eurofins-backed COAs with every single container.', sort_order: 2 },
    { client_name: 'Nguyen Van Minh', company_name: 'Hanoi Agri-Import Joint Stock Co.', country: 'Vietnam', rating: 5, content: 'High germination rate green mung beans and reliable container shipments to Haiphong Port. Their sales desk is active 24/7 on WhatsApp, giving real-time photos of bag stitching and container sealing.', sort_order: 3 },
    { client_name: 'Dr. Khalid Al-Otaibi', company_name: 'National Food Industries Group', country: 'Jeddah, Saudi Arabia', rating: 5, content: 'The large caliber Kabuli Chickpeas and Cumin Seeds received at Jeddah Islamic Port exceeded our manufacturing expectations. Complete SFDA compliance and accurate Incoterm CIF execution.', sort_order: 4 }
  ];
  for (const t of testimonials) {
    await conn.query(`
      INSERT INTO testimonials (client_name, company_name, country, rating, content, is_featured, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE content=VALUES(content), rating=VALUES(rating), updated_at=NOW();
    `, [t.client_name, t.company_name, t.country, t.rating, t.content, t.sort_order]);
  }
  console.log('✓ Testimonials seeded');

  // 8. Team Members (Only Managing Partners J.P. Vora & Kalpesh Thummar)
  await conn.query('DELETE FROM team_members');
  const team = [
    { name: 'J.P. Vora', position: 'Managing Partner', bio: '25+ years of agricultural commodities procurement, export development, and global trade across Asia, Middle East, and Europe. Leads buyer negotiations, maritime Incoterms execution, and Saurashtra farmer origination.', email: 'agrodairyexportllp@gmail.com', sort_order: 1 },
    { name: 'Kalpesh Thummar', position: 'Managing Partner', bio: 'Oversees strategic agricultural sourcing, international supply chain operations, processing facility quality control, optical Sortex grading, and port dispatch management.', email: 'kalpesh@agrodairy.com', sort_order: 2 }
  ];
  for (const tm of team) {
    await conn.query(`
      INSERT INTO team_members (name, position, bio, email, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, NOW(), NOW())
    `, [tm.name, tm.position, tm.bio, tm.email, tm.sort_order]);
  }
  console.log('✓ Team members seeded (J.P. Vora & Kalpesh Thummar)');

  // 9. Infrastructure
  try {
    await conn.query('ALTER TABLE infrastructure_items ADD COLUMN is_active BOOLEAN DEFAULT TRUE;');
  } catch (e) {
    // column already exists
  }

  const infra = [
    { title: 'Buhler Optical Color Sorting & Destoning Facility', category: 'processing', description: 'Multi-channel high-definition InGaAs optical sorting cameras detecting subtle discoloration and foreign matter at 10 MT/hour.', capacity: '80 MT Daily Sortex Capacity', location: 'Gondal Agro Industrial Zone, Rajkot, Gujarat', sort_order: 1 },
    { title: 'Modern Cold Storage & Humidity Controlled Silos', category: 'warehouse', description: 'Advanced temperature-controlled (15°C - 18°C) warehouse facility maintaining ideal low moisture for export oilseeds and spices year-round.', capacity: '15,000 MT Storage Capacity', location: 'Highway Agro Hub, Rajkot, Gujarat', sort_order: 2 },
    { title: 'In-House Advanced Quality Control & Analytical Laboratory', category: 'laboratory', description: 'Equipped with High-Performance Liquid Chromatography (HPLC) for Aflatoxin detection, moisture analyzers, microbial incubators, and sieve shakers.', capacity: '100+ Daily Sample Tests', location: 'Plant QA Division, Gondal', sort_order: 3 },
    { title: 'Clean Room Automatic Vacuum & Retail Packaging Line', category: 'packaging', description: 'Positive-pressure sanitary packaging room equipped with automatic multi-head weigher form-fill-seal and vacuum chamber machines.', capacity: '30 MT Daily Packaging', location: 'Rajkot Packaging Hub', sort_order: 4 }
  ];
  for (const i of infra) {
    await conn.query(`
      INSERT INTO infrastructure_items (title, category, description, capacity, location, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE description=VALUES(description), capacity=VALUES(capacity), updated_at=NOW();
    `, [i.title, i.category, i.description, i.capacity, i.location, i.sort_order]);
  }
  console.log('✓ Infrastructure items seeded');

  // 10. Crop Calendars
  const crops = [
    { crop_name: 'Groundnuts (Peanuts) — Kharif Crop', category: 'Oil Seeds', sowing_start: 'June', sowing_end: 'July', harvest_start: 'October', harvest_end: 'November', peak_export_start: 'November', peak_export_end: 'May', major_states: 'Gujarat (Saurashtra), Rajasthan', notes: 'Main harvest crop with maximum oil content and largest kernel sizes.' },
    { crop_name: 'Groundnuts (Peanuts) — Summer Crop', category: 'Oil Seeds', sowing_start: 'January', sowing_end: 'February', harvest_start: 'May', harvest_end: 'June', peak_export_start: 'June', peak_export_end: 'September', major_states: 'Gujarat, Tamil Nadu', notes: 'Irrigated crop ensuring fresh year-round availability for food manufacturers.' },
    { crop_name: 'Sesame Seeds (Kharif)', category: 'Oil Seeds', sowing_start: 'July', sowing_end: 'August', harvest_start: 'October', harvest_end: 'November', peak_export_start: 'November', peak_export_end: 'June', major_states: 'Gujarat, Rajasthan, West Bengal', notes: 'High demand period for Thanksgiving, Christmas, and Asian New Year baking.' },
    { crop_name: 'Cumin Seeds (Jeera) — Rabi Crop', category: 'Spices', sowing_start: 'October', sowing_end: 'November', harvest_start: 'February', harvest_end: 'March', peak_export_start: 'March', peak_export_end: 'September', major_states: 'Gujarat (Unjha), Rajasthan', notes: 'New arrivals commence late February at Unjha APMC mandi.' },
    { crop_name: 'Kabuli Chickpeas — Rabi Crop', category: 'Pulses', sowing_start: 'October', sowing_end: 'November', harvest_start: 'February', harvest_end: 'March', peak_export_start: 'March', peak_export_end: 'August', major_states: 'Madhya Pradesh, Maharashtra, Rajasthan', notes: 'Large caliber counts (42/44 and 44/46) available immediately after harvest.' }
  ];
  for (const cr of crops) {
    await conn.query(`
      INSERT INTO crop_calendars (crop_name, category, sowing_start, sowing_end, harvest_start, harvest_end, peak_export_start, peak_export_end, major_states, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE category=VALUES(category), notes=VALUES(notes), updated_at=NOW();
    `, [cr.crop_name, cr.category, cr.sowing_start, cr.sowing_end, cr.harvest_start, cr.harvest_end, cr.peak_export_start, cr.peak_export_end, cr.major_states, cr.notes]);
  }
  console.log('✓ Crop calendars seeded');

  // 11. HS Codes
  const hsCodes = [
    { hs_code: '1202.42.10', product_name: 'Bold Peanuts (Groundnut Kernels)', category: 'Peanuts', gst_export_incentive: 'RoDTEP 1.5% / DBK eligible', standard_description: 'Groundnuts, not roasted or otherwise cooked, shelled, whether or not broken: Bold variety' },
    { hs_code: '1202.42.20', product_name: 'Java Peanuts (Spanish Type)', category: 'Peanuts', gst_export_incentive: 'RoDTEP 1.5%', standard_description: 'Groundnuts, shelled: Java variety Kernels' },
    { hs_code: '1207.40.90', product_name: 'Natural Sesame Seeds', category: 'Sesame Seeds', gst_export_incentive: 'RoDTEP 1.0%', standard_description: 'Sesamum seeds, whether or not broken: Other than planting / of seed quality' },
    { hs_code: '1207.40.10', product_name: 'Hulled Sesame Seeds', category: 'Sesame Seeds', gst_export_incentive: 'RoDTEP 1.2%', standard_description: 'Sesamum seeds, whether or not broken: Hulled / Decorticated' },
    { hs_code: '0909.31.29', product_name: 'Cumin Seeds (Whole)', category: 'Spices', gst_export_incentive: 'RoDTEP 2.0%', standard_description: 'Seeds of anise, badian, fennel, coriander, cumin or caraway: Cumin seeds' },
    { hs_code: '0713.20.10', product_name: 'Kabuli Chickpeas (Garbanzo Beans)', category: 'Chickpeas', gst_export_incentive: 'RoDTEP 1.0%', standard_description: 'Dried leguminous vegetables, shelled: Chickpeas (garbanzos): Kabuli chana' },
    { hs_code: '0405.90.20', product_name: 'Pure Cow Ghee', category: 'Dairy Products', gst_export_incentive: 'RoDTEP 2.0%', standard_description: 'Butter and other fats and oils derived from milk; dairy spreads: Ghee' }
  ];
  for (const h of hsCodes) {
    await conn.query(`
      INSERT INTO hs_codes (hs_code, product_name, category, gst_export_incentive, standard_description, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE product_name=VALUES(product_name), gst_export_incentive=VALUES(gst_export_incentive), updated_at=NOW();
    `, [h.hs_code, h.product_name, h.category, h.gst_export_incentive, h.standard_description]);
  }
  console.log('✓ HS codes seeded');

  // 12. Blog Categories & Blogs
  const [bcat] = await conn.query(`
    INSERT INTO blog_categories (name, slug, created_at, updated_at)
    VALUES ('Quality & Standards', 'quality-standards', NOW(), NOW())
    ON DUPLICATE KEY UPDATE name=VALUES(name);
  `);
  const [bcatRow] = await conn.query('SELECT id FROM blog_categories WHERE slug = ?', ['quality-standards']);
  const blogCatId = bcatRow[0].id;

  await conn.query(`
    INSERT INTO blogs (category_id, title, slug, excerpt, content, is_published, published_at, views_count, created_at, updated_at)
    VALUES (?, 'Understanding European Union Aflatoxin Standards for Indian Peanut Exports', 'eu-aflatoxin-standards-indian-peanuts',
    'A comprehensive guide on EU Maximum Residue Levels (MRLs), sampling protocols, and our zero-rejection optical sorting strategy.',
    '<h3>The European Regulatory Framework</h3><p>Exporting agricultural commodities to the European Union requires absolute precision regarding mycotoxins, specifically Aflatoxin B1 and total Aflatoxin. Under European Commission regulations, peanut consignments must strictly contain less than 2.0 ppb of Aflatoxin B1 and less than 4.0 ppb of Total Aflatoxins.</p>',
    1, NOW(), 482, NOW(), NOW())
    ON DUPLICATE KEY UPDATE excerpt=VALUES(excerpt), updated_at=NOW();
  `, [blogCatId]);
  console.log('✓ Blogs seeded');

  await conn.end();
  console.log('🎉 ALL METADATA SUCCESSFULLY SEEDED INTO TIDB CLOUD!');
}

seedMetadata().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
