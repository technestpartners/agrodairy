const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, requireRole } = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, category_id, search, featured, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `;
    const params = [];

    if (category) {
      query += ` AND c.slug = ?`;
      params.push(category);
    }

    if (category_id) {
      query += ` AND p.category_id = ?`;
      params.push(category_id);
    }

    if (featured === '1' || featured === 'true') {
      query += ` AND p.is_featured = 1`;
    }

    if (search) {
      query += ` AND (p.name LIKE ? OR p.short_description LIKE ? OR p.hs_code LIKE ? OR p.grade_variety LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ` ORDER BY p.is_featured DESC, p.sort_order ASC, p.id ASC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const [products] = await pool.query(query, params);

    // Get count
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM products p 
      LEFT JOIN product_categories c ON p.category_id = c.id 
      WHERE p.is_active = 1
    `;
    const countParams = [];
    if (category) {
      countQuery += ` AND c.slug = ?`;
      countParams.push(category);
    }
    if (category_id) {
      countQuery += ` AND p.category_id = ?`;
      countParams.push(category_id);
    }
    if (featured === '1' || featured === 'true') {
      countQuery += ` AND p.is_featured = 1`;
    }
    if (search) {
      countQuery += ` AND (p.name LIKE ? OR p.short_description LIKE ? OR p.hs_code LIKE ? OR p.grade_variety LIKE ?)`;
      const s = `%${search}%`;
      countParams.push(s, s, s, s);
    }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      success: true,
      total: countResult[0].total,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products' });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE (p.slug = ? OR p.id = ?) AND p.is_active = 1
      LIMIT 1
    `, [slug, isNaN(slug) ? 0 : parseInt(slug, 10)]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = rows[0];

    // Fetch images
    const [images] = await pool.query(`
      SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC
    `, [product.id]);

    // Fetch specifications
    const [specs] = await pool.query(`
      SELECT * FROM product_specifications WHERE product_id = ? ORDER BY sort_order ASC
    `, [product.id]);

    // Group specs by spec_group
    const groupedSpecs = {};
    specs.forEach(spec => {
      const group = spec.spec_group || 'General Specifications';
      if (!groupedSpecs[group]) groupedSpecs[group] = [];
      groupedSpecs[group].push(spec);
    });

    // Fetch related products
    const [related] = await pool.query(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1
      LIMIT 4
    `, [product.category_id, product.id]);

    res.json({
      success: true,
      data: {
        ...product,
        images,
        specifications: specs,
        groupedSpecifications: groupedSpecs,
        relatedProducts: related
      }
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    res.status(500).json({ success: false, message: 'Server error fetching product' });
  }
});

// Admin: POST /api/products
router.post('/', authenticateToken, requireRole(['super_admin', 'admin', 'content_editor']), async (req, res) => {
  try {
    const {
      category_id, name, slug, sku, short_description, description, origin,
      grade_variety, hs_code, moq, moq_unit, available_quantity, shelf_life,
      storage_conditions, packaging_summary, loading_summary, main_image,
      is_featured, is_active, sort_order, meta_title, meta_description, meta_keywords
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO products (
        category_id, name, slug, sku, short_description, description, origin,
        grade_variety, hs_code, moq, moq_unit, available_quantity, shelf_life,
        storage_conditions, packaging_summary, loading_summary, main_image,
        is_featured, is_active, sort_order, meta_title, meta_description, meta_keywords,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      category_id, name, slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku, short_description, description, origin || 'Gujarat, India',
      grade_variety, hs_code, moq || 1.0, moq_unit || 'Metric Ton (MT)',
      available_quantity, shelf_life, storage_conditions, packaging_summary,
      loading_summary, main_image, is_featured ? 1 : 0, is_active !== false ? 1 : 0,
      sort_order || 0, meta_title, meta_description, meta_keywords
    ]);

    res.status(201).json({ success: true, message: 'Product created', id: result.insertId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: PUT /api/products/:id
router.put('/:id', authenticateToken, requireRole(['super_admin', 'admin', 'content_editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.id;
    delete updates.created_at;

    const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(id);

    await pool.query(`UPDATE products SET ${fields}, updated_at = NOW() WHERE id = ?`, values);

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: DELETE /api/products/:id
router.delete('/:id', authenticateToken, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
