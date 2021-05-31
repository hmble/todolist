const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
  getUser: async (req, res) => {
    try {
      console.log(req.params.username)
      const query = 'SELECT * FROM users WHERE username = $1'

      const data = await db.query(query, [req.params.username])

      return res.status(200).json(data.rows[0])
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ message: 'Server side error' })
    }
  },
  register: async (req, res) => {
    try {
      const { username, firstname, lastname, password } = req.body
      if (!(username && password)) {
        return res
          .status(400)
          .send({ message: 'username and password cannot be empty' })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const data = await db.query(
        'INSERT INTO users' +
          '(username, firstname, lastname, pass, created, updated)' +
          'VALUES($1, $2, $3, $4, NOW(), NOW()) RETURNING userid',
        [username, firstname, lastname, hash]
      )

      // TODO: Secret here should be put in enviornment variable. As this is just a simple
      // project its okay to have fun ;)
      const token = jwt.sign({ userid: data.rows[0].userid }, 'hehehe')
      return res
        .status(200)
        .json({ token: token, message: 'Registered Successfully' })
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ message: 'Server side error' })
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      if (!(username && password)) {
        return res
          .status(400)
          .send({ message: 'username and password cannot be empty' })
      }
      const data = await db.query('SELECT * FROM users WHERE username = $1', [
        username,
      ])
      const { pass, ...userDetails } = data.rows[0]
      const validPassword = await bcrypt.compare(password, pass)
      const token = jwt.sign({ userid: userDetails.userid }, 'hehehe')
      if (validPassword) {
        res.status(200).json({
          message: 'logged in successfully',
          token: token,
          details: userDetails,
        })
      } else {
        res.status(400).json({ error: 'Invalid Password' })
      }
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ message: 'Server side error' })
    }
  },
}
