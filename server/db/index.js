const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'samyak',
  host: 'localhost',
  database: 'todolist',
  password: 'hmblesam',
  port: 5432,
})

// module.exports = pool;
module.exports = {
  pool: pool,
  query: (text, params) => pool.query(text, params),
}
