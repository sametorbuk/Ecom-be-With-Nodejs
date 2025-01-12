const { Pool } = require("pg");
require("dotenv").config();

const env = process.env;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("db bağlantısı başarılı!"))
  .catch((err) => console.error("bağlantı hatası", err));

module.exports = pool;
