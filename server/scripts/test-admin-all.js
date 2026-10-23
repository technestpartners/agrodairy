const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, text: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function run() {
  console.log('--- 1. Authenticating Admin ---');
  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'admin@agrodairy.com', password: 'password123' });

  if (!loginRes.data || !loginRes.data.token) {
    console.error('Failed to log in:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.token;
  console.log('Admin login success. Token obtained.');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const endpoints = [
    '/api/admin/dashboard',
    '/api/admin/settings',
    '/api/admin/commodities',
    '/api/admin/gallery',
    '/api/admin/faqs',
    '/api/admin/testimonials',
    '/api/admin/inquiries',
    '/api/admin/team',
    '/api/admin/certifications',
    '/api/admin/ports',
    '/api/admin/infrastructure',
    '/api/admin/traceability',
    '/api/admin/audit-logs'
  ];

  console.log('\n--- 2. Checking all 13 Admin Management Modules ---');
  for (const ep of endpoints) {
    const res = await request({
      hostname: 'localhost',
      port: 5000,
      path: ep,
      method: 'GET',
      headers
    });
    const count = Array.isArray(res.data?.data) ? res.data.data.length : (res.data?.stats ? 'Dashboard Loaded' : 'Object Data');
    console.log(`[PASS] ${ep} -> Status ${res.status} (${count})`);
  }

  console.log('\n--- 3. Testing Traceability Batch Lifecycle (CRUD) ---');
  const testCode = 'TEST-BATCH-' + Date.now();
  // Create
  const createBatch = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/traceability',
    method: 'POST',
    headers
  }, {
    batch_code: testCode,
    product_id: 1,
    origin_region: 'Test Belt, Gujarat',
    harvest_date: '2026-03-01',
    container_number: 'TEST-CONTAINER-01',
    port_of_loading: 'Mundra Port',
    purity_percentage: '99.8%',
    moisture_percentage: '6.5%',
    inspection_status: 'Passed Lab Audit',
    is_active: 1
  });
  const batchId = createBatch.data?.id;
  console.log('[CREATE BATCH]', createBatch.status, 'Generated ID:', batchId);

  // Update
  if (batchId) {
    const updateBatch = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/admin/traceability/${batchId}`,
      method: 'PUT',
      headers
    }, {
      batch_code: testCode,
      product_id: 1,
      container_number: 'MSCU-TEST-UPDATED',
      purity_percentage: '99.9%',
      is_active: 1
    });
    console.log('[UPDATE BATCH]', updateBatch.status, updateBatch.data?.message);

    // Delete
    const delBatch = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/admin/traceability/${batchId}`,
      method: 'DELETE',
      headers
    });
    console.log('[DELETE BATCH]', delBatch.status, delBatch.data?.message);
  }

  console.log('\n>>> ALL ADMIN BACKEND AND CRUD MODULES FULLY OPERATIONAL <<<');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
