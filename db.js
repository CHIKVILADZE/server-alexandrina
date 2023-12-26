require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

pool.connect((err) => {
  if (err) throw err;
  console.log('Connect to postgress successfully');
});

module.exports = pool;
