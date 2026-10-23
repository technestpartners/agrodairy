const pool = require('../db');

async function seedNavbarToggles() {
  const toggles = [
    { key: 'nav_show_home', value: '1', group: 'header', label: 'SHOW NAVBAR HOME' },
    { key: 'nav_show_about', value: '1', group: 'header', label: 'SHOW NAVBAR ABOUT' },
    { key: 'nav_show_products', value: '1', group: 'header', label: 'SHOW NAVBAR PRODUCTS' },
    { key: 'nav_show_gallery', value: '1', group: 'header', label: 'SHOW NAVBAR GALLERY' },
    { key: 'nav_show_certifications', value: '1', group: 'header', label: 'SHOW NAVBAR CERTIFICATES' },
    { key: 'nav_show_contact', value: '1', group: 'header', label: 'SHOW NAVBAR CONTACT US' },
    { key: 'nav_show_quote_btn', value: '1', group: 'header', label: 'SHOW NAVBAR GET QUOTE BUTTON' },
    { key: 'nav_show_whatsapp_btn', value: '1', group: 'header', label: 'SHOW NAVBAR WHATSAPP BUTTON' },
    { key: 'nav_label_home', value: 'Home', group: 'header', label: 'NAVBAR LABEL HOME' },
    { key: 'nav_label_about', value: 'About', group: 'header', label: 'NAVBAR LABEL ABOUT' },
    { key: 'nav_label_products', value: 'Products', group: 'header', label: 'NAVBAR LABEL PRODUCTS' },
    { key: 'nav_label_gallery', value: 'Gallery', group: 'header', label: 'NAVBAR LABEL GALLERY' },
    { key: 'nav_label_certifications', value: 'Certificates', group: 'header', label: 'NAVBAR LABEL CERTIFICATES' },
    { key: 'nav_label_contact', value: 'Contact Us', group: 'header', label: 'NAVBAR LABEL CONTACT US' },
  ];

  for (const item of toggles) {
    await pool.query(`
      INSERT INTO settings (\`key\`, \`value\`, \`group\`, \`label\`, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE \`value\` = IFNULL(\`value\`, VALUES(\`value\`)), updated_at = NOW()
    `, [item.key, item.value, item.group, item.label]);
  }

  console.log('✓ Navbar enable/disable toggle settings seeded successfully');
  process.exit(0);
}

seedNavbarToggles().catch(err => {
  console.error('Error seeding navbar toggles:', err);
  process.exit(1);
});
