const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const pool = require('./db');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const inquiriesRouter = require('./routes/inquiries');
const qualityRouter = require('./routes/quality');
const marketsRouter = require('./routes/markets');
const blogsRouter = require('./routes/blogs');
const toolsRouter = require('./routes/tools');
const companyRouter = require('./routes/company');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files (serve images from public folder)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/storage', express.static(path.join(__dirname, '../storage/app/public')));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const [dbTest] = await pool.query('SELECT 1 as connected');
    res.json({
      status: 'healthy',
      server: 'running',
      database: dbTest[0].connected === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/quality', qualityRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/tools', toolsRouter);
app.use('/api/company', companyRouter);
app.use('/api/admin', adminRouter);

// Serve React frontend build if available
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// React SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`🌾 Agro Dairy Export API Server running on port ${PORT}`);
  console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
});
