const Config = require('./config.js'); // api configuration
const express = require('express'); // require express module
const api = express(); // instantiate or start express
const router = express.Router(); // router
const mongoose = require('mongoose'); // mongoDB object modeling
const passport = require("passport"); // authentication strategies
const bearerToken = require("express-bearer-token"); // express json web token middleware
const bodyParser = require('body-parser'); // handle html forms
const port = Config.api.port; // port the app will listen on



/***********************/
/* Connect To Database */
/***********************/
mongoose.Promise = global.Promise; // sets mongoose promise to use node native promise

let dbConnectionString = `mongodb://${Config.db.username}:${Config.db.password}@${Config.db.URI}`;
  
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  family: 4,  
  keepAlive: 1, 
  connectTimeoutMS: 30000
};

mongoose.connect(
  dbConnectionString,
  dbOptions
, (error) => {
  if (error) {
    console.log('There was a problem connecting to the db.');
  } else {
    console.log('Connection to db successful.');
  }
});


/***********************/
/* Authentication      */
/***********************/

// handle url encoded forms
api.use(bodyParser.urlencoded({ extended: true }));
// handle json response
api.use(bodyParser.json());
// extract bearer token from request
api.use(bearerToken());

// instantiate passport
api.use(passport.initialize());

// set passport login and signup strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);


/***********************/
/* CORS                */
/***********************/

// set cross origin resource sharing (CORS) policy
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, X-Access-Token"
  );
  res.header("Cache-Control", "no-cache");
  next();
});


/***********************/
/* Routes              */
/***********************/

require('./routes/static.js')(router); // static info routes
require('./routes/auth.js')(router, passport); // user authentication routes
require('./routes/reset.js')(router); // reset password
require('./routes/models.js')(router); // all model routes

api.use('/api/v1', router); // prepend all routes with /api/v1/


/***********************/
/* Listen              */
/***********************/

api.listen(port, () => {
  console.log(`API listening on localhost:${port}`);
});
