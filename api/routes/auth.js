const userRequired = require('../modules/apiAccess').userRequired;

module.exports = function(api, passport) {

  // interprets the JSON web token sent from the users local storage
  // if the user is not logged in, there will be no json web token in their local storage
  // returns the currently logged in user
  // is loaded on App.componentDidMount.getData on the client
	api.get('/dashboard', userRequired, (req, res) => {
		res.status(200).json({
			message: "User successfully retrieved from the Database.",
			user: res.locals.currentUser || {}
		});
	});	

  // interprets new user form
  api.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    return passport.authenticate('local-signup', (err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // the 11000 Mongo code is for a duplication email error
          // the 409 HTTP status code is for conflict error
          return res.status(409).json({
            success: false,
            message: 'Check the form for errors.',
            errors: {
              email: 'This email is already taken.'
            }
          });
        }
        console.log('local-signup error', err);
        return res.status(400).json({
          success: false,
          message: `Could not process the form.${JSON.stringify(err)}`
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'You have successfully signed up! Now you should be able to log in.'
        });
      }
    })(req, res, next);
  });

  api.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }


    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.'
        });
      }


      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token,
        user: userData
      });
    })(req, res, next);
  });

};

/* This can be refactored to validation module */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}