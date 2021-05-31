const db = require('../db')
module.exports = {
  newTodo: async (req, res) => {
    const userid = res.locals.userid
    const { title, description, is_archived } = req.body

    // let conn
    try {
      // conn = await db.connect()

      const data = await db.query(
        'INSERT INTO todos' +
          '(userid, title, description, is_archived, created, updated) VALUES' +
          '($1, $2, $3, $4, NOW(), NOW()) RETURNING *',
        [userid, title, description, is_archived]
      )

      return res.status(200).json(data.rows[0])
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { title, description, is_archived } = req.body

      let query = 'UPDATE todos SET'
      let where = ` updated = NOW() WHERE todoid = '${req.params.todoid}' RETURNING *`
      if (title) {
        query += ` title = '${title}',`
      }
      if (description) {
        query += ` description = '${description}',`
      }
      if (is_archived != undefined) {
        query += ` is_archived = ${is_archived},`
      }
      const data = await db.query(query + where)

      return res.status(200).json(data.rows[0])
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await db.query('DELETE FROM todos WHERE todoid = $1', [req.params.todoid])
      return res
        .status(200)
        .json({ message: 'deleted successfully', todoid: req.params.todoid })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  multiDelete: async (req, res) => {
    try {
      const { list } = req.body

      // uuid should be wrapped in single quote. Thats why we used map to create list of todoid wrapped in single quote
      const quotedList = list.map((d) => `'${d}'`).join(',')
      const query = `DELETE FROM todos WHERE todoid IN (${quotedList})`
      await db.query(query)
      return res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  archive: async (req, res) => {
    try {
      const { list } = req.body

      // uuid should be wrapped in single quote. Thats why we used map to create list of todoid wrapped in single quote
      const quotedList = list.map((d) => `'${d}'`).join(',')
      const query = `UPDATE todos SET is_archived = true WHERE todoid IN (${quotedList})`
      await db.query(query)
      return res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  unarchive: async (req, res) => {
    try {
      const { list } = req.body

      // uuid should be wrapped in single quote. Thats why we used map to create list of todoid wrapped in single quote
      const quotedList = list?.map((d) => `'${d}'`).join(',')
      const query = `UPDATE todos SET is_archived = true WHERE todoid IN (${quotedList})`
      await db.query(query)
      return res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
      console.log('error', error)
      return res.status(500).json({ message: 'Server side error' })
    }
  },
  getAllTodo: async (req, res) => {
    try {
      const data = await db.query('SELECT * FROM todos WHERE userid = $1', [
        res.locals.userid,
      ])

      return res.status(200).json(data.rows)
    } catch (error) {
      console.log('error ', error)
      return res.status(500).json({ message: 'sever side error' })
    }
  },
}
