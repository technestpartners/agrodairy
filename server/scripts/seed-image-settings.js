const pool = require('../db');

async function seedImageSettings() {
  const imageSettings = [
    // Logos & Icons
    { key: 'site_logo', value: '/images/logo.png', group: 'branding', label: 'PRIMARY WEBSITE HEADER LOGO' },
    { key: 'site_logo_dark', value: '/images/logo.png', group: 'branding', label: 'DARK/HEADER LOGO' },
    { key: 'site_logo_footer', value: '/images/logo.png', group: 'branding', label: 'FOOTER BRAND LOGO' },
    { key: 'site_favicon', value: '/favicon.png', group: 'branding', label: 'SITE FAVICON / BROWSER TAB ICON' },
    { key: 'site_og_image', value: '/images/hero-commodities.jpg', group: 'branding', label: 'SOCIAL SHARE PREVIEW IMAGE' },

    // Banners & Backgrounds
    { key: 'hero_image', value: '/images/hero-commodities.jpg', group: 'hero', label: 'HOMEPAGE HERO MAIN BANNER IMAGE' },
    { key: 'hero_chip_1_image', value: '/images/bg/real-ghee.jpg', group: 'hero', label: 'HERO CHIP 1 (PURE GHEE) IMAGE' },
    { key: 'hero_chip_2_image', value: '/images/products/bold-peanuts.jpg', group: 'hero', label: 'HERO CHIP 2 (BOLD PEANUTS) IMAGE' },
    { key: 'about_banner_image', value: '/images/warehouse-pallets.jpg', group: 'about', label: 'ABOUT SECTION MARITIME BANNER' },
    { key: 'banner_products', value: '/images/hero-commodities.jpg', group: 'banners', label: 'PRODUCTS PAGE HEADER BANNER' },
    { key: 'banner_about', value: '/images/infrastructure.jpg', group: 'banners', label: 'ABOUT PAGE HEADER BANNER' },
    { key: 'banner_gallery', value: '/images/port-aerial.jpg', group: 'banners', label: 'GALLERY PAGE HEADER BANNER' },
    { key: 'banner_certifications', value: '/images/quality-lab.jpg', group: 'banners', label: 'QUALITY & CERTS PAGE HEADER BANNER' },
    { key: 'banner_contact', value: '/images/cargo-ship.jpg', group: 'banners', label: 'CONTACT PAGE HEADER BANNER' },
  ];

  for (const item of imageSettings) {
    await pool.query(`
      INSERT INTO settings (\`key\`, \`value\`, \`group\`, \`label\`, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE \`value\` = IFNULL(\`value\`, VALUES(\`value\`)), updated_at = NOW()
    `, [item.key, item.value, item.group, item.label]);
  }

  console.log('✓ All image and banner setting defaults seeded successfully');
  process.exit(0);
}

seedImageSettings().catch(err => {
  console.error('Error seeding image settings:', err);
  process.exit(1);
});
