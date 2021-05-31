const Router = require('express-promise-router')

const router = new Router()
const controller = require('../controllers/user.controller')

// getUserDetails
router.get('/:username', controller.getUser)
// registerUser
router.post('/register', controller.register)
// login
router.post('/login', controller.login)
// profile

module.exports = router
