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
  },
};

module.exports = resolvers;