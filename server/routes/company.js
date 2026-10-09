const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/company/infrastructure
router.get('/infrastructure', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM infrastructure_items ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching infrastructure:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/company/team
router.get('/team', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/company/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/company/faqs
router.get('/faqs', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM faqs WHERE is_active = 1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY sort_order ASC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/company/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    // Save as inquiry with General contact tag
    const [countRows] = await pool.query('SELECT COUNT(*) as cnt FROM inquiries');
    const seq = (countRows[0].cnt + 1).toString().padStart(4, '0');
    const year = new Date().getFullYear();
    const inquiryNumber = `CON-${year}-${seq}`;

    await pool.query(`
      INSERT INTO inquiries (
        inquiry_number, name, company, email, phone, country,
        product_variant, message, status, ip_address, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, 'Contact Inquiry', ?, ?, 'new', ?, NOW(), NOW())
    `, [
      inquiryNumber, name, company || null, email, phone || 'N/A',
      subject || 'General Inquiry', message, req.ip || '127.0.0.1'
    ]);

    res.json({ success: true, message: 'Your message has been received. Our export trade desk will contact you promptly.' });
  } catch (error) {
    console.error('Error in contact:', error);
    res.status(500).json({ success: false, message: 'Server error submitting contact' });
  }
});

// POST /api/company/newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    await pool.query(`
      INSERT INTO newsletter_subscribers (email, is_active, ip_address, created_at, updated_at)
      VALUES (?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE is_active = 1, updated_at = NOW()
    `, [email, req.ip || '127.0.0.1']);

    res.json({ success: true, message: 'Subscribed to global commodity export updates successfully.' });
  } catch (error) {
    console.error('Error in newsletter:', error);
    res.status(500).json({ success: false, message: 'Subscription failed' });
  }
});

// GET /api/company/settings
router.get('/settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `key`, `value`, `group`, `label` FROM settings');
    const settingsMap = {};
    rows.forEach(r => {
      settingsMap[r.key] = r.value;
    });
    res.json({ success: true, data: settingsMap, raw: rows });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
