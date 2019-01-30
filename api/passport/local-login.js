const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;
const Config = require('../config.js');

module.exports = new PassportLocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, username, password, done) => {

	const userData = {
		username: username.trim(),
		password: password.trim()
	};

	return User.findOne({ 'username': userData.username }, (error, user) => {
		if(error) { return done(error); }
		if(!user) {
			const error = new Error('Incorrect username or password');
			error.name = 'IncorrectCredentialsError';
			return done(error);
		}
		return user.comparePassword(userData.password, (passwordError, isMatch) => {
			if(passwordError) { return done(passwordError); }
			if(!isMatch) {
				const error = new Error('Incorrect username or password');
				error.name = 'IncorrectCredentialsError';
				return done(error);
			}
			const payload = {
				sub: user._id
			};
			const token = jwt.sign(payload, Config.jwt.secret);
			const data = {
				username: user.username
			};
			return done(null, token, data);
		});
	});
});	