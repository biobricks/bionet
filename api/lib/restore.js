#!/usr/bin/env node

/****************************************/
/* Restore Data To Database From Backup */
/****************************************/

// set origin directory of script execution
const currentDir = process.cwd();

restoreBackup()
.then((result) => {
  //console.log('Result', result)
  result.success && console.log('\nRestore Successful\n');
  result.error && console.log('Restore Error: ', result.error);
  result.data.users && console.log(`Users Restored: ${result.data.users.length}`);
  result.data.labs && console.log(`Labs Restored: ${result.data.labs.length}`);
  result.data.containers && console.log(`Containers Restored: ${result.data.containers.length}`);
  result.data.physicals && console.log(`Physicals Restored: ${result.data.physicals.length}`);
  result.data.virtuals && console.log(`Virtuals Restored: ${result.data.virtuals.length}`);
  result.connection && result.connection.close();
  console.log('Restore Complete');
})
.catch((error) => {
  console.error(error);
});

async function restoreBackup() {
  let connection;
  try {
    // confirm script triggered
    console.log('Restore Triggered.');

    // require file system
    const fs = require('fs');
    
    // require database module
    const database = require(`${currentDir}/api/modules/database.js`);

    // connect to db
    connection = await database.connect();

    // filepath to the existing backup
    const backupFilePath = `${currentDir}/api/backup/backup.json`;

    // read existing backup into text
    const backupFileContent = fs.readFileSync(backupFilePath, 'utf8');

    // parse backup text into json
    let backupFileData = JSON.parse(backupFileContent);

    // require models
    const User = require(`${currentDir}/api/models/User`);
    const Lab = require(`${currentDir}/api/models/Lab`);
    const Container = require(`${currentDir}/api/models/Container`);
    const Physical = require(`${currentDir}/api/models/Physical`);
    const Virtual = require(`${currentDir}/api/models/Virtual`);

    // set required models to array
    const models = [User, Lab, Container, Physical, Virtual];
    
    // loop through models
      // check if model backup exists
      // if so delete from database and
      // restore to database from backup
    for(let i = 0; i < models.length; i++){
      const Model = models[i];
      const modelName = Model.modelName;
      console.log(`\nRestoring ${modelName}s:`);
      const modelCollectionName = Model.collection.name;
      const modelExistsInBackup = Object.keys(backupFileData).indexOf(modelCollectionName) > -1;
      const modelBackupArray = backupFileData[modelCollectionName];
      const modelBackupCount = modelBackupArray.length;
      if (modelExistsInBackup) { 
        console.log(`${modelBackupCount} ${modelName}s found in backup.json`);
        console.log(`Removing all ${modelCollectionName} from database...`);
        await Model.deleteMany({});
        console.log(`Restoring all ${modelCollectionName} from backup.json`);
        for(let j = 0; j < modelBackupCount; j++){
          const backupRecord = modelBackupArray[j];
          const restoredRecord = new Model(backupRecord);
          await restoredRecord.save();
          console.log(`Restored ${j + 1}/${modelBackupCount} ${modelName}s`);
        } 
      }
    }

    return {
      success: true,
      error: null,
      data: backupFileData,
      connection
    };

  } catch (error) {
    return {
      success: false,
      error,
      data: null,
      connection
    };
  }
}