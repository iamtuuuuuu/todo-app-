module.exports = {
    // Kiểm tra user login  
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) { // because of passport
        return next();
      }
      req.flash('error_msg', 'Not authorized');
      res.redirect('/users/login');
    }
}