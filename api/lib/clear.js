#!/usr/bin/env node

/****************************/
/* Clear Data From Database */
/****************************/

// set origin directory of script execution
const currentDir = process.cwd();

clearDatabase()
.then((result) => {
  //console.log('Result', result)
  result.success && console.log('\nClear Successful\n');
  result.error && console.log('Clear Error: ', result.error);
  result.connection && result.connection.close();
  console.log('Clear Complete');
})
.catch((error) => {
  console.error(error);
});

async function clearDatabase() {
  let connection;
  try {
    // confirm script triggered
    console.log('Clear Triggered.');

    // require file system
    const fs = require('fs');
    
    // require database module
    const database = require(`${currentDir}/api/modules/database.js`);

    // connect to db
    connection = await database.connect();

    // require models
    const User = require(`${currentDir}/api/models/User`);
    const Lab = require(`${currentDir}/api/models/Lab`);
    const Container = require(`${currentDir}/api/models/Container`);
    const Physical = require(`${currentDir}/api/models/Physical`);
    const Virtual = require(`${currentDir}/api/models/Virtual`);

    // set required models to array
    const models = [User, Lab, Container, Physical, Virtual];
    
    // loop through models and clear
    for(let i = 0; i < models.length; i++){
      const Model = models[i];
      const modelName = Model.modelName;
      const modelCollectionName = Model.collection.name;
      console.log(`Removing all ${modelCollectionName} from database...`);
      await Model.deleteMany({});
    }

    return {
      success: true,
      error: null,
      connection
    };

  } catch (error) {
    return {
      success: false,
      error,
      connection
    };
  }
}