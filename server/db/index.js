const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: 'samyak',
//   host: 'localhost',
//   database: 'todolist',
//   password: 'hmblesam',
//   port: 5432,
// })
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
})

// module.exports = pool;
module.exports = {
  pool: pool,
  query: (text, params) => pool.query(text, params),
}
