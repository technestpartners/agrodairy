const pool = require('../db');

async function seed() {
  try {
    const socialSettings = [
      {
        key: 'header_linkedin',
        value: 'https://www.linkedin.com/company/agrodairyexport',
        group: 'header',
        label: 'LinkedIn Profile / Company URL'
      },
      {
        key: 'header_instagram',
        value: 'https://www.instagram.com/agrodairyexport',
        group: 'header',
        label: 'Instagram Profile / Business URL'
      },
      {
        key: 'header_show_social',
        value: '1',
        group: 'header',
        label: 'Display Social Links in Header'
      }
    ];

    for (const item of socialSettings) {
      await pool.query(
        'INSERT INTO settings (`key`, `value`, `group`, `label`, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `label` = VALUES(`label`), `group` = VALUES(`group`), updated_at = NOW()',
        [item.key, item.value, item.group, item.label]
      );
    }

    console.log('Successfully seeded header social media settings!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding social media settings:', err);
    process.exit(1);
  }
}

seed();
