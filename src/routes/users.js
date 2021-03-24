const express = require('express')
const route = express.Router()
const usersController = require('../app/controllers/usersController')

route.get('/login', usersController.login)
route.get('/logout', usersController.logout)
route.get('/register', usersController.register)
route.post('/login', usersController.postLogin)
route.post('/register', usersController.postRegister)

module.exports = route