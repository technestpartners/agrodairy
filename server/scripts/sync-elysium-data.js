const pool = require('../db');

async function syncData() {
  console.log('--- Starting Elysium & User Data Synchronization ---');

  // 1. Update Settings
  const settings = [
    { key: 'company_name', value: 'Agro Dairy Export LLP', group: 'general', label: 'Company Name' },
    { key: 'contact_person', value: 'J.P. Vora', group: 'contact', label: 'Managing Partner' },
    { key: 'primary_phone', value: '+91 90233 63680', group: 'contact', label: 'Primary Contact' },
    { key: 'whatsapp_number', value: '+919023363680', group: 'whatsapp', label: 'WhatsApp Number' },
    { key: 'primary_email', value: 'agrodairyexportllp@gmail.com', group: 'contact', label: 'Primary Email' },
    { key: 'head_office_address', value: 'Office no. -701, THE FUTURE CORNER, Sarthana, Surat- 395013, Gujarat, India', group: 'contact', label: 'Head Office Address' },
    { key: 'loading_ports', value: 'Mundra Port (INMUN), Kandla Port (INIXY), Hazira Port (INHAZ), Pipavav Port, Gujarat, India', group: 'general', label: 'Gateway Exit Ports' },
    { key: 'tagline', value: 'Premier Exporter of Pure Dairy Ghee & Agricultural Commodities from Gujarat to Global Markets', group: 'general', label: 'Tagline' },
    { key: 'iec_code', value: '0817029381', group: 'general', label: 'IEC Code' },
    { key: 'gstin', value: '24AAHFA3928L1Z9', group: 'general', label: 'GSTIN' },
    { key: 'fssai_licence', value: '10722026000148', group: 'general', label: 'FSSAI License' },
    { key: 'apeda_rcmc', value: 'APEDA/RCMC/2026/0892', group: 'general', label: 'APEDA Registration' }
  ];

  for (const s of settings) {
    await pool.query(
      'INSERT INTO settings (`key`, `value`, `group`, `label`, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updated_at = NOW()',
      [s.key, s.value, s.group, s.label]
    );
  }
  console.log('✓ Company settings updated with J.P. Vora & Surat address.');

  // 2. Ensure Categories
  const categories = [
    { name: 'Dairy Products', slug: 'dairy-products', sort_order: 1, short_description: 'Pure Desi Cow Ghee and Buffalo Ghee made from fresh milk fat with rich aroma and golden granular texture.' },
    { name: 'Grains & Millets', slug: 'grains-millets', sort_order: 2, short_description: 'Export grade Green Millet (Bajra), Sorghum (Jowar), and Maize (Yellow & White) machine cleaned and Sortex sorted.' },
    { name: 'Peanuts (Groundnuts)', slug: 'peanuts', sort_order: 3, short_description: 'Gujarat Bold Peanut Kernels in calibrated size counts (38/42 to 70/80) with strict aflatoxin control.' },
    { name: 'Pulses & Beans', slug: 'pulses-beans', sort_order: 4, short_description: 'Green Moong Beans, Moong Mogar (split mung), Desi Chickpeas, and Large Caliber Kabuli Chickpeas.' },
    { name: 'Sesame Seeds', slug: 'sesame-seeds', sort_order: 5, short_description: 'Natural White, Hulled Auto-Sortex (99.95% / 99.98%), and Black Sesame Seeds.' },
    { name: 'Whole Spices', slug: 'whole-spices', sort_order: 6, short_description: 'Direct-from-mandi Cumin Seeds (Jeera), Coriander Seeds, and Fennel Seeds.' }
  ];

  const catMap = {};
  for (const cat of categories) {
    const [existing] = await pool.query('SELECT id FROM product_categories WHERE slug = ?', [cat.slug]);
    if (existing.length > 0) {
      catMap[cat.slug] = existing[0].id;
      await pool.query(
        'UPDATE product_categories SET name = ?, short_description = ?, sort_order = ?, updated_at = NOW() WHERE id = ?',
        [cat.name, cat.short_description, cat.sort_order, existing[0].id]
      );
    } else {
      const [ins] = await pool.query(
        'INSERT INTO product_categories (name, slug, short_description, sort_order, is_featured, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, 1, NOW(), NOW())',
        [cat.name, cat.slug, cat.short_description, cat.sort_order]
      );
      catMap[cat.slug] = ins.insertId;
    }
  }
  console.log('✓ Categories ensured.');

  // 3. User Products with Exact Specs
  const userProducts = [
    // --- DAIRY ---
    {
      category_slug: 'dairy-products',
      name: 'Pure Cow Ghee (Desi Cow Milk Fat)',
      slug: 'pure-cow-ghee',
      origin: 'Gujarat, India',
      grade_variety: 'Traditional Granular Desi Ghee',
      hs_code: '0405.90.20',
      moq: 1.0,
      moq_unit: 'MT',
      short_description: '100% pure granular Indian Cow Ghee with rich natural golden color, authentic aroma, and minimum 99.7% milk fat.',
      description: 'Manufactured through hygienic melting of high-grade cow butter in Gujarat dairy belts. Free from preservatives, starch, and vegetable fats. Packaged in food-grade tins, jars, and IBC bulk containers.',
      packaging_summary: 'Available in 500ml / 1L consumer tins, 15kg export tins, and 200kg food-grade drums. Custom buyer private label available on request.',
      loading_summary: '20ft FCL: approx 16 - 18 MT depending on tin vs drum packaging configuration.',
      main_image: 'products/cow-ghee.jpg',
      specs: [
        { spec_group: 'Quality Parameters', parameter: 'Milk Fat', value: '99.7% Min', unit: '%', test_method: 'ISO / FSSAI' },
        { spec_group: 'Quality Parameters', parameter: 'Moisture', value: '0.3% Max', unit: '%', test_method: 'FSSAI' },
        { spec_group: 'Quality Parameters', parameter: 'Free Fatty Acids (FFA)', value: '0.25% - 0.4% Max', unit: '% (as Oleic)', test_method: 'AOCS' },
        { spec_group: 'Quality Parameters', parameter: 'Reichert-Meissl (RM) Value', value: '28.0 - 32.0', unit: 'Index', test_method: 'FSSAI' },
        { spec_group: 'Quality Parameters', parameter: 'Color & Texture', value: 'Golden Yellow, Uniform Granular', unit: 'Visual', test_method: 'Organoleptic' }
      ]
    },
    {
      category_slug: 'dairy-products',
      name: 'Pure Buffalo Ghee',
      slug: 'pure-buffalo-ghee',
      origin: 'Gujarat, India',
      grade_variety: 'White Granular High-Fat Ghee',
      hs_code: '0405.90.10',
      moq: 1.0,
      moq_unit: 'MT',
      short_description: 'Pure Indian Buffalo Ghee featuring distinct white crystalline granulation, high smoke point, and 99.8% milk fat.',
      description: 'Sourced from high-fat buffalo milk cream across Gujarat dairy cooperatives. Exceptional flavor profile ideal for Middle Eastern and South Asian culinary and confectionery processing.',
      packaging_summary: 'Packaged in 15kg food-grade tin cans, consumer jars (500ml / 1L), and 200kg drums with tamper-proof seal.',
      loading_summary: '20ft FCL: approx 16 - 18 MT depending on packaging choice.',
      main_image: 'products/buffalo-ghee.jpg',
      specs: [
        { spec_group: 'Quality Parameters', parameter: 'Milk Fat', value: '99.8% Min', unit: '%', test_method: 'FSSAI' },
        { spec_group: 'Quality Parameters', parameter: 'Moisture', value: '0.2% Max', unit: '%', test_method: 'FSSAI' },
        { spec_group: 'Quality Parameters', parameter: 'Free Fatty Acids (FFA)', value: '0.3% Max', unit: '%', test_method: 'AOCS' },
        { spec_group: 'Quality Parameters', parameter: 'Texture', value: 'Creamy White Granular', unit: 'Physical', test_method: 'Visual' }
      ]
    },

    // --- GRAINS ---
    {
      category_slug: 'grains-millets',
      name: 'Green Millet (Pearl Millet & Foxtail Millet)',
      slug: 'green-millet-pearl-foxtail',
      origin: 'Gujarat, India',
      grade_variety: 'Pearl Millet / Foxtail Millet',
      hs_code: '1008.21.00',
      moq: 24.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Export quality Indian Green Millet (Bajra), Sortex cleaned with 98-99% machine clean & 99% Sortex purity.',
      description: 'High-energy, gluten-free ancient grain cleaned through pre-cleaners, gravity separators, and Buhler optical sorters. Free from weevils and foreign odors.',
      packaging_summary: '25 kg / 50 kg PP bags or Jute bags. Buyer marks and private label available on request.',
      loading_summary: '20 ft container: about 24–25 MT · 40 ft HC: about 26 MT',
      main_image: 'products/green-millet.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Purity', value: '98-99% Machine, 99% Sortex', unit: '%', test_method: 'Machine & Optical Sortex' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '11% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.25% Max', unit: '%', test_method: 'Physical Inspection' },
        { spec_group: 'Specification', parameter: 'Damaged & Discoloured', value: '1% to 1.5% Max', unit: '%', test_method: 'Visual Count' },
        { spec_group: 'Specification', parameter: 'Type', value: 'Pearl Millet, Foxtail Millet', unit: 'Variety', test_method: 'Botanical' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 24 - 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 26 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },
    {
      category_slug: 'grains-millets',
      name: 'Sorghum (Jowar / White Sorghum)',
      slug: 'sorghum-jowar',
      origin: 'Gujarat, India',
      grade_variety: 'Machine Clean / Optical Sortex',
      hs_code: '1007.90.00',
      moq: 24.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Premium Indian Sorghum (Jowar), 98-99% Machine cleaned & 99% Sortex sorted with low moisture and zero foreign matter.',
      description: 'Carefully harvested white sorghum kernels with strict quality controls. Cleaned, graded, and bagged for international human consumption and animal feed markets.',
      packaging_summary: '25 kg / 50 kg PP bags or Jute bags. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 24–25 MT · 40 ft HC: about 26 MT',
      main_image: 'products/sorghum.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Purity', value: '98-99% Machine, 99% Sortex', unit: '%', test_method: 'Sortex Optical' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '11% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.25% Max', unit: '%', test_method: 'Physical Inspection' },
        { spec_group: 'Specification', parameter: 'Damaged & Discoloured', value: '1% to 1.5% Max', unit: '%', test_method: 'Visual Count' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 24 - 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 26 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },
    {
      category_slug: 'grains-millets',
      name: 'Maize (Yellow Maize & White Maize)',
      slug: 'maize-yellow-white',
      origin: 'Gujarat, India',
      grade_variety: 'Yellow Maize / White Maize',
      hs_code: '1005.90.00',
      moq: 24.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Indian Yellow & White Maize (Corn) with 98-99% Machine clean, 99% Sortex purity, and max 11% moisture.',
      description: 'Cleaned yellow and white corn suitable for starch extraction, poultry feed, and food processing. Screened against aflatoxin and mycotoxins.',
      packaging_summary: '25 kg / 50 kg PP bags. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 24 MT · 40 ft HC: about 26 MT',
      main_image: 'products/maize.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Type', value: 'Yellow Maize, White Maize', unit: 'Variety', test_method: 'Commercial' },
        { spec_group: 'Specification', parameter: 'Purity', value: '98-99% Machine, 99% Sortex', unit: '%', test_method: 'Optical Sortex' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '11% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.25% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged & Discoloured', value: '2.5% to 3% Max', unit: '%', test_method: 'Visual Count' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 24 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 26 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },

    // --- PEANUT ---
    {
      category_slug: 'peanuts',
      name: 'Bold Peanut Kernels (Groundnuts)',
      slug: 'bold-peanut-kernels',
      origin: 'Gujarat, India',
      grade_variety: 'Counts: 38/42, 40/50, 50/60, 60/70, 70/80',
      hs_code: '1202.42.10',
      moq: 19.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Origin Gujarat Bold Peanut Kernels in calibrated counts (38/42, 40/50, 50/60, 60/70, 70/80) with 7% to 8% moisture max.',
      description: 'Hand-picked and optical Sortex graded Gujarat Bold Peanuts with reddish-brown skin and elongated shape. Rigorously tested for Aflatoxin with <4 ppb EU certificate of analysis.',
      packaging_summary: '25 kg / 50 kg PP bags OR Jute bag, 25 kg vacuum pack. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 19 MT · 40 ft HC: about 27 MT',
      main_image: 'products/bold-peanuts.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Counts per Ounce', value: '38/42, 40/50, 50/60, 60/70, 70/80', unit: 'Counts/Oz', test_method: 'Mechanical Count' },
        { spec_group: 'Specification', parameter: 'Origin', value: 'Gujarat, India', unit: 'Region', test_method: 'Geographical Origin' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '7% to 8% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.5% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged Kernels', value: '1% to 2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Aflatoxin', value: 'Negative (< 4 ppb EU compliance available)', unit: 'ppb', test_method: 'HPLC / ELISA' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 19 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 27 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },

    // --- PULSES ---
    {
      category_slug: 'pulses-beans',
      name: 'Green Moong Beans (Whole)',
      slug: 'green-moong-beans-whole',
      origin: 'Gujarat, India',
      grade_variety: 'Counts: 180-200, 200-220, 220-240, under 250, 260-270',
      hs_code: '0713.31.10',
      moq: 25.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'High-purity (98-99.9%) Green Moong Beans with shiny or dull green color and maximum 12% moisture.',
      description: 'Carefully sorted green mung beans from Saurashtra and Gujarat agricultural belts. Uniform caliber, high germination index, and ideal for sprouting or canning.',
      packaging_summary: '25 kg / 50 kg PP bags OR Jute bag. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 25 MT · 40 ft HC: about 27 MT',
      main_image: 'products/green-moong.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Size Counts', value: '180-200, 200-220, 220-240, Under 250, 260-270', unit: 'Counts/100g', test_method: 'Weight Calibration' },
        { spec_group: 'Specification', parameter: 'Purity', value: '98 - 99.9%', unit: '%', test_method: 'Sortex Clean' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '12% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.5% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged', value: '2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Broken', value: '1.5% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Colour', value: 'Shiny or Dull Green Colour', unit: 'Appearance', test_method: 'Visual' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 27 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },
    {
      category_slug: 'pulses-beans',
      name: 'Moong Mogar (Huskless Split Mung Beans)',
      slug: 'moong-mogar-split-mung',
      origin: 'Gujarat, India',
      grade_variety: 'Counts: 200-220, 220-240, under 250, 260-270',
      hs_code: '0713.31.90',
      moq: 25.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Yellow skinless split mung beans (Moong Mogar / Dhuli Moong), 98-98.99% purity and max 12% moisture.',
      description: 'Dehusked, polished, and split green mung beans yielding clean yellow kernels. Highly digestible and processed under food safety guidelines.',
      packaging_summary: '25 kg / 50 kg PP bags OR Jute bag. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 25 MT · 40 ft HC: about 27 MT',
      main_image: 'products/moong-mogar.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Counts', value: '200-220, 220-240, Under 250, 260-270', unit: 'Counts/100g', test_method: 'Calibration' },
        { spec_group: 'Specification', parameter: 'Purity', value: '98 - 98.99%', unit: '%', test_method: 'Sortex Clean' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '12% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.5% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged', value: '2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Broken', value: '1.5% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Colour', value: 'Yellow (without skin)', unit: 'Appearance', test_method: 'Visual' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 27 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },
    {
      category_slug: 'pulses-beans',
      name: 'Desi Chickpeas (Bengal Gram)',
      slug: 'desi-chickpeas-bengal-gram',
      origin: 'Gujarat & Western India',
      grade_variety: 'Size Caliber: 5-7mm / 6-8mm',
      hs_code: '0713.20.20',
      moq: 25.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Indian Desi Chickpeas (5-7mm / 6-8mm), 98-99% purity, light to dark brown color with max 12% moisture.',
      description: 'Small dark-brown chickpeas characterized by a thick seed coat and high fiber content. Machine cleaned and de-stoned for direct canning or besan (gram flour) milling.',
      packaging_summary: '25 kg / 50 kg PP bags OR Jute bag. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 25 MT · 40 ft HC: about 27 MT',
      main_image: 'products/desi-chickpeas.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Size / Caliber', value: '5-7mm / 6-8mm', unit: 'Diameter', test_method: 'Sieve Analysis' },
        { spec_group: 'Specification', parameter: 'Purity', value: '98 - 99%', unit: '%', test_method: 'Sortex Clean' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '12% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.5% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged', value: '2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Broken / Split', value: '1.5% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Immature', value: '2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Colour', value: 'Light to Dark Brown', unit: 'Appearance', test_method: 'Visual' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 27 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    },
    {
      category_slug: 'pulses-beans',
      name: 'Kabuli Chickpea (Garbanzo Beans)',
      slug: 'kabuli-chickpea-garbanzo',
      origin: 'Gujarat & Central India',
      grade_variety: 'Counts: 38/40 to 75/80 (8mm to 12mm+)',
      hs_code: '0713.20.10',
      moq: 25.0,
      moq_unit: 'MT (1 x 20ft FCL)',
      short_description: 'Cream-colored 99% Sortex Clean Kabuli Chickpeas calibrated in counts from 38/40 down to 75/80 with max 12% moisture.',
      description: 'Large caliber cream-white garbanzo beans with thin skins and rich nutty flavor. Thoroughly sorted on optical sorters to eliminate green, wrinkled, or split grains.',
      packaging_summary: '25 kg / 50 kg PP bags OR Jute bag. Buyer marks and private label on request.',
      loading_summary: '20 ft container: about 25 MT · 40 ft HC: about 27 MT',
      main_image: 'products/kabuli-chickpeas.jpg',
      specs: [
        { spec_group: 'Specification', parameter: 'Counts per Ounce', value: 'Count 38/40 to 75/80', unit: 'Counts/Oz', test_method: 'Mechanical Count' },
        { spec_group: 'Specification', parameter: 'Purity', value: '99% Sortex Clean', unit: '%', test_method: 'Optical Sortex' },
        { spec_group: 'Specification', parameter: 'Moisture', value: '12% Max', unit: '%', test_method: 'Moisture Meter' },
        { spec_group: 'Specification', parameter: 'Foreign Matter', value: '0.5% Max', unit: '%', test_method: 'Physical' },
        { spec_group: 'Specification', parameter: 'Damaged', value: '1% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Broken / Split', value: '1% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Immature', value: '2% Max', unit: '%', test_method: 'Visual' },
        { spec_group: 'Specification', parameter: 'Colour', value: 'Cream White', unit: 'Appearance', test_method: 'Visual' },
        { spec_group: 'Logistics', parameter: '20ft FCL Load', value: 'About 25 MT', unit: 'Weight', test_method: 'Container Manifest' },
        { spec_group: 'Logistics', parameter: '40ft HC Load', value: 'About 27 MT', unit: 'Weight', test_method: 'Container Manifest' }
      ]
    }
  ];

  for (const item of userProducts) {
    const catId = catMap[item.category_slug] || 1;
    let productId;

    const [existing] = await pool.query('SELECT id FROM products WHERE slug = ?', [item.slug]);
    if (existing.length > 0) {
      productId = existing[0].id;
      await pool.query(`
        UPDATE products SET
          category_id = ?, name = ?, origin = ?, grade_variety = ?, hs_code = ?,
          moq = ?, moq_unit = ?, short_description = ?, description = ?,
          packaging_summary = ?, loading_summary = ?, is_featured = 1, is_active = 1,
          updated_at = NOW()
        WHERE id = ?
      `, [
        catId, item.name, item.origin, item.grade_variety, item.hs_code,
        item.moq, item.moq_unit, item.short_description, item.description,
        item.packaging_summary, item.loading_summary, productId
      ]);
    } else {
      const [ins] = await pool.query(`
        INSERT INTO products (
          category_id, name, slug, origin, grade_variety, hs_code,
          moq, moq_unit, short_description, description,
          packaging_summary, loading_summary, is_featured, is_active,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, NOW(), NOW())
      `, [
        catId, item.name, item.slug, item.origin, item.grade_variety, item.hs_code,
        item.moq, item.moq_unit, item.short_description, item.description,
        item.packaging_summary, item.loading_summary
      ]);
      productId = ins.insertId;
    }

    // Replace specifications
    await pool.query('DELETE FROM product_specifications WHERE product_id = ?', [productId]);
    let sort = 1;
    for (const spec of item.specs) {
      await pool.query(`
        INSERT INTO product_specifications (
          product_id, spec_group, parameter, value, unit, test_method, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [productId, spec.spec_group, spec.parameter, spec.value, spec.unit, spec.test_method, sort++]);
    }
    console.log(`✓ Synchronized product: ${item.name}`);
  }

  console.log('--- All products and specifications synced successfully! ---');
}

syncData().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
