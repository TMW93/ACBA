const {Team, Division} = require('../models');

const resolvers = {
  Query: {
    team: async(parent, {teamName}) => {
      const team = await Team.findOne({name: teamName});
      return team;
    },
    teamsByDivision: async(parent, {divisionName}) => {
      const teams = await Team.find({division: divisionName});
      return teams;
    },
    allTeams: async() => {
      const teams = await Team.find();
      return teams;
    },

    division: async(parent, {divisionId}) => {
      const divison = await Division.findOne({_id: divisionId}).populate('teams');
      return divison;
    },
    allDivisions: async() => {
      const divisions = await Division.find();
      return divisions;
    },
  }
};

module.exports = resolvers;