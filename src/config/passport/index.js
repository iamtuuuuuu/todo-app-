const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../../app/models/User')

module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email})
            .then(user => {
                if(!user) {
                    return done(null, false, {message:'No User found'})
                }
                // match password
                // here password is the input password entered on the login form
                // user.password is the encrypted password stored in the db
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err
                    if(isMatch) {
                        // first params: err
                        // second: user
                        // third: message
                        return done(null, user)
                    } else {
                        return done(null,false, {message: 'Password is incorrect'})
                    }
                })
            })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
       
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
    });
}

