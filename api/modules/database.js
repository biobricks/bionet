async function connect() {
  try {

    // require db odm
    const mongoose = require('mongoose');
    // require api configuration
    const Config = require('../config');

    // create connection string from api configuration
    let connString = `mongodb://${Config.db.username}:${Config.db.password}@${Config.db.URI}`;

    // set a connection configuration options object
    const connOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      family: 4,  
      keepAlive: 1, 
      connectTimeoutMS: 30000
    };

    // sets odm promise to nodes native promise
    mongoose.Promise = global.Promise;
    // sync connect function
    mongoose.connect(connString, connOptions);
    
    // assign connection to object for response
    const connection = mongoose.connection;
    
    // event method that prints to console on connection
    connection.on('connected', () => {
      console.log(`\nconnected to ${Config.db.URI}\n`);
    });
    
    // event method that prints to console on disconnection
    connection.on('disconnected', () => {
      console.log(`\ndisconnected from ${Config.db.URI}\n`);
    });

    return connection;
  } catch (error) {
    throw error;
  }  
}

const database = {
  connect
};

module.exports = database;