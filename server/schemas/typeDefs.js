const typeDefs = `
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

  type Query {
    team(name: String!): Team
    teamsByDivision(division: String!): Team
    allTeams: [Team]
    division(divisionId: ID!): Division
    allDivisions: [Division]
  }
`;

module.exports = typeDefs;