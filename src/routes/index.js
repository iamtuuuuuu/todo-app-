const usersRoute = require('./users')
const todosRoute = require('./todos')

function route(app) {
    app.use('/users', usersRoute)
    app.use('/todos', todosRoute)

    app.use('/', function(req, res) {
        res.render('home')
    })
}

module.exports = route