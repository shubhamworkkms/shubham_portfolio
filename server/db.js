const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'shubham_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on load and auto-initialize tables
const fs = require('fs');
const path = require('path');

pool.getConnection()
  .then(async conn => {
    console.log('Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'shubham_portfolio'));
    conn.release();

    // Auto-initialize tables if missing
    try {
      const [tables] = await pool.query("SHOW TABLES LIKE 'personal_info'");
      if (tables.length === 0) {
        console.log("Database tables not found. Auto-initializing from schema.sql...");
        const schemaPath = path.join(__dirname, 'schema.sql');
        if (fs.existsSync(schemaPath)) {
          const schemaSql = fs.readFileSync(schemaPath, 'utf8');
          
          // Split SQL into individual statements
          const statements = schemaSql
            .split(';')
            .map(stmt => stmt.trim())
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
