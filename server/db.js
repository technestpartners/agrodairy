const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agrodairy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
};

// Enable SSL when connecting to remote cloud databases (e.g. TiDB Cloud, Aiven, AWS)
const isRemoteHost = process.env.DB_HOST && process.env.DB_HOST !== '127.0.0.1' && process.env.DB_HOST !== 'localhost';
if (process.env.DB_SSL === 'true' || isRemoteHost) {
  dbConfig.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
  };
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;
