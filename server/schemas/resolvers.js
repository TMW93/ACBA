const {Team, Division, User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
  Query: {
    //user queries
    user: async(parent, args, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id).populate('teams');
        return user
      }
      throw AuthenticationError;
    },

    //team queries
    team: async(parent, {teamName}) => {
      const team = await Team.findOne({name: teamName});
      return team;
    },
    teamsByDivision: async(parent, {divisionId}) => {
      const teams = await Team.find({division: divisionId});
      return teams;
    },
    allTeams: async() => {
      const teams = await Team.find().populate('division');
      return teams;
    },

    //division queries
    division: async(parent, {divisionId}) => {
      const divison = await Division.findOne({_id: divisionId}).populate('teams');
      return divison;
    },
    allDivisions: async() => {
      const divisions = await Division.find().populate('teams');
      return divisions;
    },
  },

  Mutation: {
    //user mutations
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    //team mutations
    addTeam: async (parent, {teamName, divisionId}) => {
      const team = await Team.create({
        name: teamName,
        division: divisionId
      });

      await Division.findByIdAndUpdate(divisionId, {
        $push: {teams: team._id}
      });

      return team;
    },
    removeTeam: async (parent, {teamId}) => {
      const teams = await Team.findByIdAndDelete(teamId);

      return teams;
    },

    //division mutations
    addDivision: async (parent, {divisionName, divisionDay}) => {
      const division = await Division.create({
        name: divisionName,
        day: divisionDay
      });

      return division;
    },

    removeDivision: async (parent, {divisionId}) => {
      const divisions = await Division.findByIdAndDelete(divisionId);
      if(divisions && divisions.teams.length > 0) {
        await Team.deleteMany({_id: {$in: divisions.teams}});
        console.log("Teams deleted successfully.");
      }
      
      return divisions;
    }
  },
};

module.exports = resolvers;