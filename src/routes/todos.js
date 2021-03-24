const express = require('express')
const route = express.Router()
const todosController = require('../app/controllers/todosController')

route.get('/add', todosController.add)
route.post('/create', todosController.postCreate)

module.exports = route