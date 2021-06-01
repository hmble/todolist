const { Pool, Client } = require('pg')
// const pool = new Pool({
//   user: 'samyak',
//   host: 'localhost',
//   database: 'todolist',
//   password: 'hmblesam',
//   port: 5432,
// })
const connectionString = process.env.DATABASE_URL + '?sslmode=require'
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

// module.exports = pool;
module.exports = {
  pool: pool,
  query: (text, params) => pool.query(text, params),
}
