const express = require('express')
const route = express.Router()
const todosController = require('../app/controllers/todosController')
const {ensureAuthenticated} = require('../helpers/auth')


route.get('/add', ensureAuthenticated, todosController.add)
route.get('/', ensureAuthenticated, todosController.show)
route.get('/edit/:id', ensureAuthenticated, todosController.edit)
route.post('/create', ensureAuthenticated, todosController.postCreate)
route.put('/:id', ensureAuthenticated, todosController.update)
route.delete('/:id', ensureAuthenticated, todosController.delete)

module.exports = route