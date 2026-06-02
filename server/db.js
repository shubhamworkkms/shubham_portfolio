const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionString = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL || process.env.DATABASE_URL;

const pool = connectionString
  ? mysql.createPool(connectionString)
  : mysql.createPool({
    host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'sql12829045',
    password: process.env.DB_PASSWORD || 'ZRJwun6ARl',
    database: process.env.DB_NAME || 'sql12829045',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

// Test connection on load and auto-initialize tables
const fs = require('fs');
const path = require('path');

pool.getConnection()
  .then(async conn => {
    const dbName = connectionString
      ? (connectionString.split('/').pop() || 'Remote Database').split('?')[0]
      : (process.env.DB_NAME || 'shubham_portfolio');
    console.log('Successfully connected to MySQL database: ' + dbName);
    conn.release();

    // Auto-initialize tables if missing
    try {
      // Ensure messages table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            subject VARCHAR(150) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_read BOOLEAN DEFAULT FALSE
        )
      `);

      const [tables] = await pool.query("SHOW TABLES LIKE 'personal_info'");
      if (tables.length === 0) {
        console.log("Database tables not found. Auto-initializing from schema.sql...");
        const schemaPath = path.join(__dirname, 'schema.sql');
        if (fs.existsSync(schemaPath)) {
          const schemaSql = fs.readFileSync(schemaPath, 'utf8');

          // Split SQL into individual statements and strip comments
          const statements = schemaSql
            .split(';')
            .map(stmt => {
              // Strip single-line comments (-- or #) and trim
              return stmt
                .split('\n')
                .map(line => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('--') || trimmed.startsWith('#')) {
                    return '';
                  }
                  return line;
                })
                .join('\n')
                .trim();
            })
            .filter(stmt => {
              if (stmt.length === 0) return false;
              const upper = stmt.toUpperCase();
              // Skip database creation/switching statements that fail on cloud platforms
              return !upper.startsWith('CREATE DATABASE') && !upper.startsWith('USE ');
            });

          for (const statement of statements) {
            await pool.query(statement);
          }
          console.log("Database tables successfully auto-initialized and seeded!");
        } else {
          console.warn("schema.sql not found at " + schemaPath + ", skipping auto-init.");
        }
      } else {
        console.log("Database tables verified (personal_info exists).");
      }
    } catch (dbInitErr) {
      console.error("Auto-initialization of database tables failed:", dbInitErr.message);
    }
  })
  .catch(err => {
    console.error('MySQL database connection failed: ' + err.message);
    console.log('NOTE: Please make sure MySQL is running and the database exists (see server/schema.sql).');
  });

module.exports = pool;
