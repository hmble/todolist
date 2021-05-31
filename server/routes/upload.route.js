const Router = require('express-promise-router')
const multer = require('../utils/multer')

const router = new Router()
const controller = require('../controllers/upload.controller')

router.post('/profile', multer.single('file'), controller.fileupload)
module.exports = router
