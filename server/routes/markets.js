const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/markets
router.get('/', async (req, res) => {
  try {
    const [markets] = await pool.query(`
      SELECT * FROM export_markets ORDER BY sort_order ASC
    `);

    const [countries] = await pool.query(`
      SELECT c.*, em.slug as market_slug
      FROM countries c
      JOIN export_markets em ON c.export_market_id = em.id
      WHERE c.is_active = 1
      ORDER BY c.sort_order ASC, c.name ASC
    `);

    const mapped = markets.map(market => ({
      ...market,
      countries: countries.filter(c => c.export_market_id === market.id)
    }));

    res.json({ success: true, data: mapped });
  } catch (error) {
    console.error('Error fetching export markets:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/markets/countries/:slug
router.get('/countries/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [countryRows] = await pool.query(`
      SELECT c.*, em.name as market_name, em.slug as market_slug
      FROM countries c
      JOIN export_markets em ON c.export_market_id = em.id
      WHERE c.slug = ? AND c.is_active = 1
      LIMIT 1
    `, [slug]);

    if (countryRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }

    const country = countryRows[0];

    const [ports] = await pool.query(`
      SELECT * FROM ports WHERE country_id = ? ORDER BY is_major DESC, name ASC
    `, [country.id]);

    res.json({
      success: true,
      data: {
        ...country,
        ports
      }
    });
  } catch (error) {
    console.error('Error fetching country detail:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/markets/packaging-types
router.get('/packaging-types', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM packaging_types WHERE is_active = 1 ORDER BY sort_order ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching packaging types:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
