const {Team, Division, User, Game} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
  Query: {
    //user queries
    user: async(parent, args, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id);
        return user
      }
      throw AuthenticationError;
    },

    //team queries
    teamById: async(parent, {teamId}) => {
      const team = await Team.findById(teamId).populate('division');
      return team;
    },
    teamByName: async(parent, {teamName, divisionId}) => {
      const team = await Team.findOne({name: teamName, division: divisionId}).populate('division').exec();
      return team;
    },
    teamsByDivision: async(parent, {divisionId}) => {
      const teams = await Team.find({division: divisionId}).populate('division');
      return teams;
    },
    allTeams: async() => {
      const teams = await Team.find().populate('division');
      return teams;
    },

    //division queries
    division: async(parent, {divisionId}) => {
      const divison = await Division.findOne({_id: divisionId}).populate('teams').populate('games').populate('playedGames');
      return divison;
    },
    allDivisions: async() => {
      const divisions = await Division.find().populate('teams');
      return divisions;
    },
    divisionBySlug: async(parent, {slug}) => {
      const division = await Division.findOne({slug: slug}).populate('teams');
      return division;
    },

    //game queries
    game: async(parent, {gameId}) => {
      const game = await Game.findOne({_id: gameId});
      return game;
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
    changePassword: async (parent, {currentPassword, newPassword, confirmedPassword}, context) => {
      if(context.user) {
        const user = await User.findById(context.user._id);
        
        if(!user) {
          throw AuthenticationError;
        }

        if(newPassword.length < 8) {
          throw new Error('Password should be at least 8 characters long.');
        }

        if(newPassword !== confirmedPassword) {
          throw new Error('Passwords do not match.');
        }

        const isMatch = await user.comparePassword(currentPassword);
        if(!isMatch) {
          throw new Error('Incorrect current password.');
        }

        user.password = newPassword;

        await user.save();

        return user;
      }
      throw AuthenticationError;
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
    addDivision: async (parent, {divisionName, divisionDay, slugName}) => {
      const division = await Division.create({
        name: divisionName,
        day: divisionDay,
        slug: slugName,
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
    },

    //game mutations
    addGame: async (parent, {gameTime, gameDate, teamOneId, teamTwoId, divisionId, venue}) => {
      const game = await Game.create({
        time: gameTime,
        date: gameDate,
        teamOne: teamOneId,
        teamTwo: teamTwoId,
        venue: venue,
      });

      await Division.findByIdAndUpdate(divisionId, {
        $push: {games: game._id}},
        {new: true}
    );
      
      return game;
    },

    removeGames: async (parent, {divisionId}) => {
      const divisions = await Division.findById(divisionId);
      if(divisions && divisions.games.length > 0) {
        await Game.deleteMany({_id: {$in: divisions.games}});
        console.log("Games deleted successfully.");
      }

      return divisions;
    },

    removeArchivedGames: async (parent, {divisionId}) => {
      const divisions = await Division.findById(divisionId);
      if(divisions && divisions.playedGames.length > 0) {
        await Game.deleteMany({_id: {$in: divisions.playedGames}});
        console.log("Games deleted successfully.");
      }

      return divisions;
    },

    removeSingleGame: async (parent, {gameId}) => {
      const games = await Game.findByIdAndDelete(gameId);

      return games;
    },

    updateGames: async (parent, {divisionId, gameId, scoreWinner, scoreLoser, winner, loser}) => {
      const game = await Game.findByIdAndUpdate(
        {_id: gameId},
        {
          scoreWinner: scoreWinner,
          scoreLoser: scoreLoser,
          winner: winner,
          loser: loser
        },
        {new: true, runValidators: true}
      );
      
      if(game) {
        if(winner && loser === 'draw') {
          await Team.findOneAndUpdate(
            {name: winner , division: divisionId},
            {$inc: {draws: 1, totalPoints: scoreWinner}},
            {new: true}
          );

          await Team.findOneAndUpdate(
            {name: loser, division: divisionId},
            {$inc: {draws: 1, totalPoints: scoreLoser}},
            {new: true}
          );
        } else {
          await Team.findOneAndUpdate(
            {name: winner, division: divisionId},
            {$inc: {wins: 1, totalPoints: scoreWinner}},
            {new: true}
          );

          await Team.findOneAndUpdate(
            {name: loser, division: divisionId},
            {$inc: {losses: 1, totalPoints: scoreLoser}},
            {new: true}
          );
        }
      }

      await Division.findByIdAndUpdate(
        {_id: divisionId},
        {
          $push: {playedGames: game._id},
          $pull: {games: gameId}
        },
        {new: true}
      );
      
      return game;
    },

    resetSeason: async (parent, {divisionId}) => {
      await Team.updateMany(
        {division: divisionId},
        {
          $set: {
            wins: 0,
            losses: 0,
            draws: 0,
            totalPoints: 0,
            payment: false,
          }
        }
      );
    },

    //payment mutations
    updatePayment: async (parent, {teamId, payment}) => {
      await Team.findByIdAndUpdate(
        {_id: teamId},
        {
          payment: payment,
        },
        {new: true, runValidators: true}
      );
    },
  },
};

module.exports = resolvers;