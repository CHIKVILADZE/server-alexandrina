require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  db_url: process.env.DB_URL,
});

module.exports = pool;
