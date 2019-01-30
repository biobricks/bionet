const User = require('../models/User');

const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  User
  .find({})
  .exec((error, users) => {
    if (error) { return done(error, null); }
    const userData = {
      username: username.trim(),
      password: password.trim(),
      isAdmin: users.length === 0 ? true : false,
      email: req.body.email,
      name: req.body.name,
      imageUrl: req.body.imageUrl
    };
      
    const newUser = new User(userData);
    newUser.save((err, user) => {
      if (err) { return done(err, user); }

      return done(null, user);
    });  
  });
});