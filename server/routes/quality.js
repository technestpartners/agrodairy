const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// GET /api/certifications
router.get('/certifications', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM certifications WHERE is_active = 1 ORDER BY sort_order ASC, title ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/certifications/verify/:query (Live validation)
router.get('/certifications/verify/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const cleanQuery = query.trim();

    const [rows] = await pool.query(`
      SELECT title, slug, certificate_no, issuing_body, issue_date, expiry_date, status, description, verification_url
      FROM certifications
      WHERE (certificate_no LIKE ? OR title LIKE ? OR slug LIKE ?) AND is_active = 1
      LIMIT 1
    `, [`%${cleanQuery}%`, `%${cleanQuery}%`, `%${cleanQuery}%`]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `No active certification record found matching "${cleanQuery}".`
      });
    }

    const cert = rows[0];
    res.json({
      success: true,
      valid: cert.status === 'active',
      data: cert
    });
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ success: false, message: 'Server error verifying certificate' });
  }
});

// GET /api/quality-documents
router.get('/quality-documents', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM quality_documents WHERE is_public = 1 ORDER BY sort_order ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching quality documents:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/traceability/verify/:batchCode (Farm-to-Port provenance lookup)
router.get('/traceability/verify/:batchCode', async (req, res) => {
  try {
    const { batchCode } = req.params;
    const cleanCode = batchCode.trim();

    const [rows] = await pool.query(`
      SELECT tb.*, p.name as product_name, p.slug as product_slug, p.grade_variety, p.origin, p.main_image
      FROM traceability_batches tb
      JOIN products p ON tb.product_id = p.id
      WHERE tb.batch_code = ? AND tb.is_active = 1
      LIMIT 1
    `, [cleanCode]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        found: false,
        message: `No batch found for Lot Code "${cleanCode}". Please verify your packaging QR or shipping manifest.`
      });
    }

    res.json({
      success: true,
      found: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error verifying traceability batch:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: GET /api/traceability
router.get('/traceability', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT tb.*, p.name as product_name
      FROM traceability_batches tb
      JOIN products p ON tb.product_id = p.id
      ORDER BY tb.created_at DESC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching traceability batches:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
