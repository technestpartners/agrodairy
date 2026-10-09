const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// POST /api/inquiries (Submit RFQ)
router.post('/', async (req, res) => {
  try {
    const {
      name, company, email, phone, whatsapp, country,
      product_id, product_variant, quantity, unit = 'Metric Ton (MT)',
      packaging_preference, destination_port, incoterm = 'FOB',
      target_price, target_currency = 'USD', preferred_delivery_date,
      message, subscribe_newsletter
    } = req.body;

    if (!name || !email || !phone || !country || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, phone, country, message).' });
    }

    // Generate RFQ number
    const [countRows] = await pool.query('SELECT COUNT(*) as cnt FROM inquiries');
    const seq = (countRows[0].cnt + 1).toString().padStart(4, '0');
    const year = new Date().getFullYear();
    const inquiryNumber = `RFQ-${year}-${seq}`;

    // Get default sales manager
    const [salesUsers] = await pool.query("SELECT id FROM users WHERE role IN ('sales_manager', 'admin', 'super_admin') LIMIT 1");
    const assignedTo = salesUsers.length > 0 ? salesUsers[0].id : null;

    const [result] = await pool.query(`
      INSERT INTO inquiries (
        inquiry_number, name, company, email, phone, whatsapp, country,
        product_id, product_variant, quantity, unit, packaging_preference,
        destination_port, incoterm, target_price, target_currency,
        preferred_delivery_date, message, status, assigned_to, ip_address,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, NOW(), NOW())
    `, [
      inquiryNumber, name, company || null, email, phone, whatsapp || null, country,
      product_id ? parseInt(product_id, 10) : null, product_variant || null,
      quantity ? parseFloat(quantity) : null, unit, packaging_preference || null,
      destination_port || null, incoterm, target_price ? parseFloat(target_price) : null,
      target_currency, preferred_delivery_date || null, message, assignedTo,
      req.ip || '127.0.0.1'
    ]);

    const inquiryId = result.insertId;

    // Insert history
    await pool.query(`
      INSERT INTO inquiry_status_histories (inquiry_id, user_id, from_status, to_status, comment, created_at, updated_at)
      VALUES (?, NULL, 'none', 'new', 'Inquiry submitted by prospective buyer via web portal', NOW(), NOW())
    `, [inquiryId]);

    // Optional newsletter subscription
    if (subscribe_newsletter && email) {
      await pool.query(`
        INSERT IGNORE INTO newsletter_subscribers (email, is_active, ip_address, created_at, updated_at)
        VALUES (?, 1, ?, NOW(), NOW())
      `, [email, req.ip || '127.0.0.1']);
    }

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
      inquiry_number: inquiryNumber,
      id: inquiryId
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
});

// GET /api/inquiries/check/:inquiryNumber
router.get('/check/:inquiryNumber', async (req, res) => {
  try {
    const { inquiryNumber } = req.params;
    const [rows] = await pool.query(`
      SELECT i.inquiry_number, i.status, i.company, i.country, i.product_variant, i.created_at,
             p.name as product_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      WHERE i.inquiry_number = ?
    `, [inquiryNumber]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error checking inquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: GET /api/inquiries
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT i.*, p.name as product_name, u.name as assigned_to_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      LEFT JOIN users u ON i.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ` AND i.status = ?`;
      params.push(status);
    }

    if (search) {
      query += ` AND (i.inquiry_number LIKE ? OR i.name LIKE ? OR i.company LIKE ? OR i.email LIKE ? OR i.country LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    query += ` ORDER BY i.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [inquiries] = await pool.query(query, params);
    const [totalRows] = await pool.query('SELECT COUNT(*) as total FROM inquiries');

    res.json({
      success: true,
      total: totalRows[0].total,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching admin inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: GET /api/inquiries/:id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(`
      SELECT i.*, p.name as product_name, p.slug as product_slug, u.name as assigned_to_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      LEFT JOIN users u ON i.assigned_to = u.id
      WHERE i.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const inquiry = rows[0];

    const [notes] = await pool.query(`
      SELECT n.*, u.name as user_name
      FROM inquiry_notes n
      LEFT JOIN users u ON n.user_id = u.id
      WHERE n.inquiry_id = ?
      ORDER BY n.created_at DESC
    `, [id]);

    const [history] = await pool.query(`
      SELECT h.*, u.name as user_name
      FROM inquiry_status_histories h
      LEFT JOIN users u ON h.user_id = u.id
      WHERE h.inquiry_id = ?
      ORDER BY h.created_at DESC
    `, [id]);

    res.json({
      success: true,
      data: {
        ...inquiry,
        notes,
        history
      }
    });
  } catch (error) {
    console.error('Error fetching inquiry detail:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: PUT /api/inquiries/:id/status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    const [current] = await pool.query('SELECT status FROM inquiries WHERE id = ?', [id]);
    if (current.length === 0) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const oldStatus = current[0].status;

    await pool.query('UPDATE inquiries SET status = ?, updated_at = NOW() WHERE id = ?', [status, id]);

    await pool.query(`
      INSERT INTO inquiry_status_histories (inquiry_id, user_id, from_status, to_status, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `, [id, req.user.id, oldStatus, status, comment || `Status changed from ${oldStatus} to ${status}`]);

    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: POST /api/inquiries/:id/notes
router.post('/:id/notes', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { note, type = 'internal' } = req.body;

    if (!note) {
      return res.status(400).json({ success: false, message: 'Note text is required' });
    }

    await pool.query(`
      INSERT INTO inquiry_notes (inquiry_id, user_id, note, type, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `, [id, req.user.id, note, type]);

    res.json({ success: true, message: 'Note added successfully' });
  } catch (error) {
    console.error('Error adding inquiry note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
