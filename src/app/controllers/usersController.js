const User = require('../models/User') 
const bcrypt = require('bcryptjs')
const passport = require('passport')
class usersController {
    // GET /users/login
    login(req, res) {
        res.render('users/login')
    }

    // GET /users/logout
    logout(req, res) {
        req.logout()
        req.flash('success_mgs', 'You are logged out')
        res.redirect('/')
    }

    // GET /users/register
    register(req, res) {
        res.render('users/register')
    }

    // POST /users/login 
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/todos',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next)
    }


    // POST /users/register
    postRegister(req, res, next) {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({text: 'Passwords do not match!'});
        }
        if (req.body.password.length < 4) {
            errors.push({text: 'Password must be at least 4 characters'}); 
        }
        if (errors.length > 0) {
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            })
        } 
        else 
        {
            User.findOne({ email: req.body.email })
                .then((user) => {
                    if (user) {
                    req.flash('error_msg', 'A user with the same email already exists');
                    res.redirect('/users/register');
                    } else {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        });
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save().then((user) => {
                                req.flash('success_msg', 'You are now registered and can login');
                                res.redirect('/users/login');
                            }).catch(err => {
                                console.log(err);
                                return;
                            });
                            });
                        });
                    }
                })
        }
    }

}

module.exports = new usersController