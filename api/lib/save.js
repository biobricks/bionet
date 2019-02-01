#!/usr/bin/env node

/*****************************/
/* Backup Data From Database */
/*****************************/

// set origin directory of script execution
const currentDir = process.cwd();

saveBackup()
.then((result) => {
  //console.log('Result', result)
  result.success && console.log('\nSave Successful');
  result.error && console.log('Save Error: ', result.error);
  result.connection && result.connection.close();
})
.catch((error) => {
  console.error(error);
});


async function saveBackup() {
  let connection;
  try {
    // confirm script triggered
    console.log('Save Triggered.');

    // require file system
    const fs = require('fs');

    // require database module
    const database = require(`${currentDir}/api/modules/database.js`);

    // connect to db
    connection = await database.connect();

    // filepath to the existing backup
    const backupFilePath = `${currentDir}/api/backup/backup.json`;
    // read existing backup
    const fileContent = fs.readFileSync(backupFilePath, 'utf8');
    // set existing backup to old backup
    let oldData = JSON.parse(fileContent);
    // stage existing backup to have its data replaced
    let data = oldData;

    // get timestamped filename and destination path for old backup data
    const now = new Date();
    // const month = now.getMonth() + 1;
    // const monthFormatted = month < 10 ? `0${month}` : `${month}`;
    // const date = now.getDate();
    // const dateFormatted = date < 10 ? `0${date}` : `${date}`;
    // const year = String(now.getFullYear());
    const timestamp = now.getTime();
    const filename = `backup_${oldData.createdAt}.json`;
    const oldDestFilePath = `${currentDir}/api/backup/${filename}`;
    console.log(`\nWriting previous backup to ${oldDestFilePath}...`);
    fs.writeFileSync(oldDestFilePath, JSON.stringify(data, null, 2));
    console.log('Write Successful');

    // start replacing existing backup data with current data from database
    data.createdAt = timestamp;
    
    const User = require(`${currentDir}/api/models/User`);
    console.log('\nFetching Users...');
    data.users = await User.find();
    console.log(`Users Found: ${data.users.length}`);
    
    const Lab = require(`${currentDir}/api/models/Lab`);
    console.log('\nFetching Labs...');
    data.labs = await Lab.find();
    console.log(`Labs Found: ${data.labs.length}`);

    const Container = require(`${currentDir}/api/models/Container`);
    console.log('\nFetching Containers...');
    data.containers = await Container.find();
    console.log(`Containers Found: ${data.containers.length}`);

    const Physical = require(`${currentDir}/api/models/Physical`);
    console.log('\nFetching Physicals...');
    data.physicals = await Physical.find();
    console.log(`Physicals Found: ${data.physicals.length}`);

    const Virtual = require(`${currentDir}/api/models/Virtual`);
    console.log('\nFetching Virtuals...');
    data.virtuals = await Virtual.find();
    console.log(`Virtuals Found: ${data.virtuals.length}`);

    // write updated backup data to backup
    console.log(`\nWriting new backup to ${backupFilePath}...`);
    fs.writeFileSync(backupFilePath, JSON.stringify(data, null, 2));
    console.log('Write Successful');

    return {
      success: true,
      error: null,
      data,
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
