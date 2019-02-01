#!/usr/bin/env node

/************************************************/
/* Seed Data Into Database For Testing Purposes */
/************************************************/

// set origin directory of script execution
const currentDir = process.cwd();

seedDatabase()
.then((result) => {
  //console.log('Result', result)
  result.success && console.log('\nSeed Successful');
  result.error && console.log('\nSeed Error: ', result.error);
  result.connection && result.connection.close();
  console.log('Seed database complete');
})
.catch((error) => {
  console.error(error);
});

async function seedDatabase() {
  let connection;
  try {
    // confirm script triggered
    console.log('Seeding database with example data...');

    // require file system
    const fs = require('fs');
    
    // require database module
    const database = require(`${currentDir}/api/modules/database.js`);

    // connect to db
    connection = await database.connect();

    // recursive function to seed example data
    await seedExampleData();

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

// parent async call in example data creation 
async function seedExampleData() {
  try {
    
    // clear
    console.log('Clearing Database...');
    await clearDatabase();
    console.log('Database Cleared\n');
    
    // create demo user
    const demoUserObj = {
      username: "demouser",
      password: "password",
      name: "Demo User",
      email: "demouser@example.com"
    };
    console.log(`Creating ${demoUserObj.username}`);
    let demoUser = await createModel('User', demoUserObj);
    console.log(`  ${demoUserObj.username} Created - Saving...`);
    await demoUser.save();
    console.log(`  ${demoUserObj.username} Saved`);
    
    // admin user
    const adminUserObj = {
      username: "adminuser",
      password: "password",
      name: "Admin User",
      email: "adminuser@example.com",
      isAdmin: true
    };
    console.log(`Creating ${adminUserObj.username}`);
    let adminUser = await createModel('User', adminUserObj);
    console.log(`  ${adminUserObj.username} Created - Saving...`);
    await adminUser.save();
    console.log(`  ${adminUserObj.username} Saved`);
    
    // create lab 1
    const lab1Obj = {
      createdBy: adminUser._id, // adminuser is creator
      updatedBy: adminUser._id,
      name: 'Example Lab',
      description: 'An example Lab generated for testing.',
      innerWidth: 15,
      innerHeight: 15,
      users: [adminUser._id], // adminuser is member
      joinRequests: [demoUser._id] // demouser has requested to join
    };
    const lab1 = await createModel('Lab', lab1Obj);
    
    // create freezer1 in lab
    const freezer1Obj = {
      createdBy: adminUser._id, // adminuser is creator
      updatedBy: adminUser._id,
      name: 'Freezer 1',
      description: 'An example Container generated for testing.',
      lab: lab1._id,
      parentX: 1,
      parentY: 1,
      innerWidth: 1,
      innerHeight: 6,
      width: 2,
      height: 2        
    };
    console.log(`Creating ${freezer1Obj.name}`);
    let freezer1 = await createModel('Container', freezer1Obj);
    console.log(`  ${freezer1.name} Created - Saving...`);
    await freezer1.save();
    console.log(`  ${freezer1.name} Saved`);

    // create stacked horizontal shelves in freezer1
    for(let i = 0; i < freezer1.innerHeight; i++){
      const shelfObj = {
        createdBy: adminUser._id, // adminuser is creator
        updatedBy: adminUser._id,
        name: `Shelf ${i + 1}`,
        description: 'An example Container generated for testing.',
        lab: lab1._id,
        parent: freezer1._id,
        parentX: 1,
        parentY: i + 1,
        innerWidth: 4,
        innerHeight: 1,
        width: 1,
        height: 1  
      };
      console.log(`Creating ${shelfObj.name}`);
      let shelf = await createModel('Container', shelfObj);
      console.log(`  ${shelf.name} Created - Saving...`);
      await shelf.save();
      console.log(`  ${shelf.name} Saved`);      
    }


    return true;    
  } catch (error) {
    throw error;
  }
}


// lab creation
async function createLab(labObj) {
  try {
    console.log(`Creating ${labObj.name}`);
    let lab = await createModel('Lab', labObj);
    console.log(`  ${lab.name} Created - Saving...`);
    await lab.save();
    console.log(`  ${lab.name} Saved`);
    return lab;
  } catch (error) {
    throw error;
  }
}


// generic model instantiation
async function createModel(modelName, modelObj) {
  try {
    const Model = require(`${currentDir}/api/models/${modelName}`);
    const newRecord = new Model(modelObj);
    //let createMessage = modelName === 'User' ? `Creating ${modelObj.username}` : `Creating ${modelObj.name}`
    const name = modelName === 'User' ? modelObj.username : modelObj.name;
    //console.log(createMessage);
    return newRecord;
  } catch (error) {
    throw error;
  }
}

async function clearDatabase() {
  try {

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
      //const modelName = Model.modelName;
      const modelCollectionName = Model.collection.name;
      console.log(`  Removing all ${modelCollectionName} from database...`);
      await Model.deleteMany({});
    }

    return {
      success: true,
      error: null
    };

  } catch (error) {
    return {
      success: false,
      error
    };
  }
}