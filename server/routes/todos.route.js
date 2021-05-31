const Router = require('express-promise-router')

const router = new Router()
const controller = require('../controllers/todo.controller')
const middleware = require('../middleware')
module.exports = router

// add todo
router.post('/new', controller.newTodo)
// updated todo
router.put('/:todoid', controller.updateTodo)
// delete todo
router.delete('/:todoid', controller.deleteTodo)
// multiple delete todo
router.post('/multidelete', controller.multiDelete)
// archive todo
router.post('/archive', controller.archive)
// unarchive todo
router.post('/unarchive', controller.unarchive)

// getAllTodo for current user with filter ( archived )
router.get('/all', controller.getAllTodo)
