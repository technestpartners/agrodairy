const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 10, offset = 0 } = req.query;

    let query = `
      SELECT b.*, c.name as category_name, c.slug as category_slug, u.name as author_name
      FROM blogs b
      JOIN blog_categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE b.is_published = 1
    `;
    const params = [];

    if (category) {
      query += ` AND c.slug = ?`;
      params.push(category);
    }

    if (search) {
      query += ` AND (b.title LIKE ? OR b.excerpt LIKE ? OR b.content LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    query += ` ORDER BY b.published_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [blogs] = await pool.query(query, params);
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/blogs/categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, COUNT(b.id) as blogs_count
      FROM blog_categories c
      LEFT JOIN blogs b ON c.id = b.category_id AND b.is_published = 1
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(`
      SELECT b.*, c.name as category_name, c.slug as category_slug, u.name as author_name
      FROM blogs b
      JOIN blog_categories c ON b.category_id = c.id
      LEFT JOIN users u ON b.author_id = u.id
      WHERE b.slug = ? AND b.is_published = 1
      LIMIT 1
    `, [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    // Increment views
    await pool.query('UPDATE blogs SET views_count = views_count + 1 WHERE id = ?', [rows[0].id]);

    const [recent] = await pool.query(`
      SELECT id, title, slug, featured_image, published_at
      FROM blogs
      WHERE id != ? AND is_published = 1
      ORDER BY published_at DESC LIMIT 3
    `, [rows[0].id]);

    res.json({
      success: true,
      data: {
        ...rows[0],
        recentArticles: recent
      }
    });
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
