require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.CONNECTION_URI + '?sslmode=require',
});

pool.connect((err) => {
  if (err) throw err;
  console.log('Connect to postgress successfully');
});

module.exports = pool;
