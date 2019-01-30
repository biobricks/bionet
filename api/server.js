const express = require('express'); // require express module
const api = express(); // instantiate or start express
const port = 3001; // port the app will listen on
const mongoose = require('mongoose'); // mongoDB object modeling
const Config = require('./config.js'); // api configuration

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

api.get('/', (req, res) => { // http get request to landing page
  res.json({ // respond with json
    success: true,
    message: "Welcome to the Bionet API.",
    errors: [],
    data: {}
  });
});

api.listen(port, () => { // listen on port
  console.log(`API listening on localhost:${port}`);
});