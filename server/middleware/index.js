const jwt = require('jsonwebtoken')

module.exports = {
  checkauth: async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]

      try {
        const decoded = jwt.verify(token, 'hehehe')

        res.locals.userid = decoded.userid

        next()
      } catch (error) {
        res.sendStatus(403).json({ message: 'Access denied' })
      }
    } else {
      res.sendStatus(403).json({ message: 'Access denied' })
    }
  },
}
