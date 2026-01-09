const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    admin: Boolean
  }

  type Team {
    _id: ID
    name: String
    division: Division
    payment: String
    wins: Int
    losses: Int
    draws: Int
    totalPoints: Int
  }

  type Division {
    _id: ID
    name: String
    day: String
    slug: String
    teams: [Team]
    games: [Game]
    playedGames: [Game]
  }
  
  type Game {
    _id: ID
    time: String
    date: String
    teamOne: String
    teamTwo: String
    venue: String
    scoreWinner: Int
    scoreLoser: Int
    winner: String
    loser: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    teamById(teamId: ID!): Team
    teamByName(teamName: String!, divisionId: ID): Team
    teamsByDivision(divisionId: ID!): Team
    allTeams: [Team]
    division(divisionId: ID!): Division
    allDivisions: [Division]
    divisionBySlug(slug: String!): Division
    game(gameId: ID!): Game
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    changePassword(currentPassword: String!, newPassword: String!, confirmedPassword: String!): Auth
    addTeam(divisionId: ID!, teamName: String!): Team
    removeTeam(teamId: ID!): Team
    addDivision(divisionName: String!, divisionDay: String!, slugName: String!): Division
    removeDivision(divisionId: ID!): Division
    addGame(gameTime: String!, gameDate: String!, teamOneId: String!, teamTwoId: String!, divisionId: ID!, venue: String!): Game
    removeGames(divisionId: ID!): Division
    removeArchivedGames(divisionId: ID!) : Division
    removeSingleGame(gameId: ID!): Game
    updateGames(divisionId: ID!, gameId: ID!, scoreWinner: Int!, scoreLoser: Int!, winner: String!, loser: String!): Game
    resetSeason(divisionId: ID!): Team
    updatePayment(teamId: ID!, payment: String!): Team
  }
`;

module.exports = typeDefs;