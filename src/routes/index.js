const usersRoute = require('./users')
const todosRoute = require('./todos')

function route(app) {
    app.use('/users', usersRoute)
    app.use('/todos', todosRoute)

    app.use('/', function(req, res) {
        const title='Welcome to ToDoNow!';
        res.render('index', {title})
    })
}

module.exports = route