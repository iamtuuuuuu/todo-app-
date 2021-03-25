const {mongooseToObject} = require('../util/mongoose')
module.exports = {
  // Kiểm tra user login  
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) { // because of passport
      res.locals.user = mongooseToObject(req.user)
      return next();
    }
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/login');
  }
}