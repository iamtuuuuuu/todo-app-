const express = require('express')
const route = express.Router()
const usersController = require('../app/controllers/usersController')

route.get('/login', usersController.login)
route.get('/register', usersController.register)

module.exports = route