const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../../models');

module.exports = {
  // User registration
  signup: (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        db.User.create({ username, password: hashedPassword })
          .then(() => {
            res.redirect('/login');
          })
          .catch((err) => {
            console.error(err);
            res.status(400).json({ error: 'User registration failed' });
          });
      }
    });
  },

  // User login
  login: passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  }),

  // User logout
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  // Check if user is authenticated
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
};
