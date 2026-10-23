const pool = require('../db');

async function seedHeroToggles() {
  const toggles = [
    { key: 'hero_show_primary_btn', value: '1', group: 'hero', label: 'SHOW HERO PRIMARY BUTTON' },
    { key: 'hero_show_secondary_btn', value: '1', group: 'hero', label: 'SHOW HERO SECONDARY BUTTON' },
    { key: 'hero_show_badge', value: '1', group: 'hero', label: 'SHOW HERO BADGE' },
    { key: 'hero_show_trust_bar', value: '1', group: 'hero', label: 'SHOW HERO TRUST BAR' },
    { key: 'hero_show_stats', value: '1', group: 'hero', label: 'SHOW HERO STATS COUNTERS' },
    { key: 'header_show_ticker', value: '1', group: 'header', label: 'SHOW HEADER TICKER' },
    { key: 'header_show_cta', value: '1', group: 'header', label: 'SHOW HEADER CTA BUTTON' },
  ];

  for (const item of toggles) {
    await pool.query(`
      INSERT INTO settings (\`key\`, \`value\`, \`group\`, \`label\`, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE \`value\` = IFNULL(\`value\`, VALUES(\`value\`)), updated_at = NOW()
    `, [item.key, item.value, item.group, item.label]);
  }

  console.log('Hero and Header toggle settings seeded successfully');
  process.exit(0);
}

seedHeroToggles().catch(err => {
  console.error(err);
  process.exit(1);
});
