const db = require('../config/connection');
const {Division} = require('../models');
const divisionSeeds = require('./divisionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Division', 'divisions');

  await Division.create(divisionSeeds);

  console.log('Seeding Completed.');

  process.exit(0);
});