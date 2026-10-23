const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fs = require('fs');
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

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Static files (serve images from public folder and uploads)
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client/public')));
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

const liveSyncService = require('./services/liveSync');

// API Routes
app.get('/api/live-sync', liveSyncService.handleSSEConnection);
app.get('/api/live-sync/status', (req, res) => {
  res.json({
    success: true,
    activeSubscribers: liveSyncService.getActiveClientCount(),
    timestamp: Date.now()
  });
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/quality', qualityRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/tools', toolsRouter);
app.use('/api/company', companyRouter);
app.use('/api/admin', adminRouter);

const fs = require('fs');

// Serve React frontend build if available locally
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// React SPA fallback (for local development when dist exists)
app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ success: false, message: 'Not found' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌾 Agro Dairy Export API Server running on port ${PORT}`);
    console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
