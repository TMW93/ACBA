const db = require('../config/connection');
const cleanDB = require('./cleanDB');
const {Division, Team} = require('../models');

const divisionSeeds = require('./divisionSeeds.json');
const teamSeeds = require('./teamSeeds.json');

db.once('open', async () => {
  await cleanDB('Division', 'divisions');
  await cleanDB('Team', 'teams');

  const divisions = await Division.create(divisionSeeds);
  const teams = await Team.create(teamSeeds);
  
  let i = 0;

  for(const newDivision of divisions) {
    // seeding 4 teams into each division
    for(let count = 0; count < 4; count++) {
      i++;
      newDivision.teams.push(teams[i]._id);
      teams[i].division = newDivision._id;
      await teams[i].save();
      // console.log(teams[i]);
    };
    await newDivision.save();
    // console.log(newDivision);
  }

  console.log('Seeding Completed.');

  process.exit(0);
});