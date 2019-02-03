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
    // await seedExampleData(); // old
    await seedTestData(); // new

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
// new
async function seedTestData() {
  try {
    
    // clear the database first
    await clearDatabase();

    // create users
    let demoUser = await createUser('demouser', 'Demo User');
    let adminUser = await createUser('adminuser', 'Admin User', true);

    // create labs
    let lab1 = await createLab('Lab 1', demoUser._id, 15, 15, [demoUser._id], joinRequests=[adminUser._id]);
    let lab2 = await createLab('Lab 2', adminUser._id, 15, 15, [adminUser._id], joinRequests=[demoUser._id]);

    // end
    return true; 

  } catch (error) {
    throw error;
  }
}

// parent async call in example data creation 
// old
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
    console.log('Lab Object Pre Save', lab1Obj);
    const lab1 = await createModel('Lab', lab1Obj);
    await lab1.save();

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


// user creation
async function createUser(username, name, isAdmin=false) {
  try {
    const recordObj = {
      username,
      password: "password",
      name,
      email: `${username.trim().toLowerCase()}@example.com`,
      isAdmin
    };
    let record = await createModel('User', recordObj);
    return record;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// lab creation
async function createLab(name, creatorId, innerWidth=15, innerHeight=15, users=[], joinRequests=[]) {
  try {
    const recordObj = {
      createdBy: creatorId,
      updatedBy: creatorId,
      name,
      description: 'An example Lab generated for testing.',
      innerWidth,
      innerHeight,
      users,
      joinRequests,
      breadcrumbs: []
    };

    // create random virtuals
    let virtuals = [];
    for(let i = 0; i < 5; i++) {
      let virtual = await createVirtual(getRandomName(), creatorId);
      virtuals.push(virtual);  
    }
    
    // create lab with content
    let lab = await createModel('Lab', recordObj);
    lab.breadcrumbs.push({
      _id: lab._id,
      name: lab.name,
      model: "Lab",
      icon: "teach"
    });
    lab = await lab.save();
    // freezers in lab
    for(let f = 0; f < 2; f++) {
      let freezer = await createContainer(`Freezer ${f + 1}`, creatorId, lab._id, lab._id, lab.name, lab.breadcrumbs, f, 1, 1, 6, 1, 1);
      for(let s = 0; s < 2; s++) {
        let shelf = await createContainer(`Shelf ${s}`, creatorId, lab._id, freezer._id, freezer.name, freezer.breadcrumbs, 1, s, 6, 1, 1, 1);
        for(let b = 0; b < 2; b++) {
          let box = await createContainer(`Box ${b}`, creatorId, lab._id, shelf._id, shelf.name, shelf.breadcrumbs, b, 1, 1, 6, 1, 1);
          for(let p = 0; p < 2; p++) {
            let plate = await createContainer(`Plate ${p}`, creatorId, lab._id, box._id, box.name, box.breadcrumbs, 1, p, 12, 8, 1, 1);
            for(let ph = 0; ph < 2; ph++) {
              let virtual = virtuals[getRandomInt(0, virtuals.length - 1)];
              const physicalName = `${virtual.name}.${getRandomInts(5)}`;
              await createPhysical(physicalName, creatorId, lab._id, virtual._id, plate._id, plate.name, plate.breadcrumbs, ph, 1, 1, 1);
            }
          }
        }
      }
    }
    return lab;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// container creation
async function createContainer(name, creatorId, labId, parentId, parentName, parentBreadcrumbs, parentX=1, parentY=1, innerWidth=3, innerHeight=3, width=1, height=1) {
  try {
    let recordObj = {
      createdBy: creatorId,
      updatedBy: creatorId,
      name,
      description: 'An example Container generated for testing.',
      lab: labId,
      parentX,
      parentY,
      innerWidth,
      innerHeight,
      width,
      height,
      breadcrumbs: parentBreadcrumbs
    };
    let container = await createModel('Container', recordObj);
    container.breadcrumbs.push({
      _id: container._id,
      name: container.name,
      model: "Container",
      icon: "grid"
    });
    container = await container.save();
    return container;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// virtual creation
async function createVirtual(name, creatorId) {
  try {
    const recordObj = {
      createdBy: creatorId,
      updatedBy: creatorId,
      name,
      description: 'An example Virtual generated for testing.',
      provenance: '<provenance goes here>',
      genotype: '<genotype goes here>',
      sequence: '<sequence goes here>',
      breadcrumbs: []
    };
    let virtual = await createModel('Virtual', recordObj);
    virtual.breadcrumbs.push({
      _id: virtual._id,
      name: virtual.name,
      model: "Virtual",
      icon: "dna"
    });
    virtual = await virtual.save();
    return virtual;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// physical creation
async function createPhysical(name, creatorId, labId, virtualId, parentId, parentName, parentBreadcrumbs, parentX=1, parentY=1, width=1, height=1) {
  try {
    const recordObj = {
      createdBy: creatorId,
      updatedBy: creatorId,
      name,
      description: 'An example Physical generated for testing.',
      lab: labId,
      parent: parentId,
      parentX,
      parentY,
      virtual: virtualId,
      width,
      height,
      breadcrumbs: parentBreadcrumbs
    };
    let physical = await createModel('Physical', recordObj);
    physical.breadcrumbs.push({
      _id: physical._id,
      name: physical.name,
      model: "Physical",
      icon: "flask"
    });
    physical = await physical.save();
    return physical;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// generic model instantiation
async function createModel(modelName, modelObj) {
  try {
    let name = modelName === 'User' ? modelObj.username : modelObj.name;
    const Model = require(`${currentDir}/api/models/${modelName}`);
    const newRecord = new Model(modelObj);
    const savedRecord = await newRecord.save();
    console.log(`Created ${modelName}: ${name}`);
    return savedRecord;
  } catch (error) {
    throw error;
  }
}

async function clearDatabase() {
  try {
    console.log('Clearing Database...');
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

    console.log('Database Cleared\n');
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInts(len) {
  let result = ""
  for(let i = 0; i < len; i++){
    result += String(getRandomInt(0,9))
  }
  return Number(result);
}

function getRandomName() {
  let virtualPrefixes = ['Asd', 'Bfg', 'Csi', 'Dpi', 'Eff', 'Foo'];
  let randomPrefix = virtualPrefixes[getRandomInt(0, virtualPrefixes.length - 1)];
  return `${randomPrefix}${getRandomInts(4)}`;
}

function coinFlip() {
  return getRandomInt(0,1) === 1;
} 