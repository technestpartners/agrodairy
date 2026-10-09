const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT c.*, COUNT(p.id) as products_count
      FROM product_categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.name ASC
    `);

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Server error fetching categories' });
  }
});

// GET /api/categories/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [catRows] = await pool.query(`
      SELECT * FROM product_categories WHERE slug = ? AND is_active = 1 LIMIT 1
    `, [slug]);

    if (catRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const category = catRows[0];

    const [products] = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN product_categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.is_active = 1
      ORDER BY p.is_featured DESC, p.sort_order ASC
    `, [category.id]);

    res.json({
      success: true,
      data: {
        ...category,
        products
      }
    });
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    res.status(500).json({ success: false, message: 'Server error fetching category' });
  }
});

module.exports = router;
