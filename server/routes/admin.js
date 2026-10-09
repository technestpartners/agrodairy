const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const [users] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = users[0];

    // Normalize PHP bcrypt hash if needed ($2y$ -> $2a$)
    const normalizedHash = user.password.replace(/^\$2y\$/, '$2a$');
    const isValid = bcrypt.compareSync(password, normalizedHash);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'agrodairy_jwt_secret_token_secure_2026_xyz!',
      { expiresIn: '7d' }
    );

    // Record audit log
    await pool.query(`
      INSERT INTO audit_logs (user_id, action, model_type, model_id, details, ip_address, created_at, updated_at)
      VALUES (?, 'login', 'User', ?, 'Admin portal session login', ?, NOW(), NOW())
    `, [user.id, user.id, req.ip || '127.0.0.1']);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/admin/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role, phone, department, created_at FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user: users[0] });
  } catch (error) {
    console.error('Error in /me:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/dashboard
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const [totalProducts] = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = 1');
    const [totalInquiries] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
    const [newInquiries] = await pool.query("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'");
    const [totalBatches] = await pool.query('SELECT COUNT(*) as count FROM traceability_batches WHERE is_active = 1');
    const [totalQuotations] = await pool.query('SELECT COUNT(*) as count FROM quotations');

    // Inquiries grouped by status
    const [statusBreakdown] = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM inquiries
      GROUP BY status
    `);

    // Recent 5 inquiries
    const [recentInquiries] = await pool.query(`
      SELECT i.id, i.inquiry_number, i.name, i.company, i.country, i.status, i.quantity, i.unit, i.created_at,
             p.name as product_name
      FROM inquiries i
      LEFT JOIN products p ON i.product_id = p.id
      ORDER BY i.created_at DESC
      LIMIT 6
    `);

    // Category distribution
    const [categoryCounts] = await pool.query(`
      SELECT c.name, COUNT(p.id) as count
      FROM product_categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY count DESC
    `);

    res.json({
      success: true,
      stats: {
        totalProducts: totalProducts[0].count,
        totalInquiries: totalInquiries[0].count,
        newInquiries: newInquiries[0].count,
        totalBatches: totalBatches[0].count,
        totalQuotations: totalQuotations[0].count,
        statusBreakdown,
        recentInquiries,
        categoryCounts
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/admin/audit-logs
router.get('/audit-logs', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, u.name as user_name, u.email as user_email
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT 100
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
