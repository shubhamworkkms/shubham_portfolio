const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'shubham_portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on load
pool.getConnection()
  .then(conn => {
    console.log('Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'shubham_portfolio'));
    conn.release();
  })
  .catch(err => {
    console.error('MySQL database connection failed: ' + err.message);
    console.log('NOTE: Please make sure MySQL is running and the database exists (see server/schema.sql).');
  });

module.exports = pool;
