const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    teams: [Team]
  }

  type Team {
    _id: ID
    name: String
    division: String
    payment: Boolean
  }

  type Division {
    _id: ID
    name: String
    day: String
    teams: [Team]
  }

  type Auth {
    token: ID!
    user:User
  }

  type Query {
    user: User
    team(name: String!): Team
    teamsByDivision(division: String!): Team
    allTeams: [Team]
    division(divisionId: ID!): Division
    allDivisions: [Division]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;