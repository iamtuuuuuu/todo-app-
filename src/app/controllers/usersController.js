

class usersController {
    // GET /users/login
    login(req, res) {
        res.render('users/login')
    }

    // GET /users/register
    register(req, res) {
        res.render('users/register')
    }
}

module.exports = new usersController