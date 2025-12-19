import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TEAM = gql`
  mutation addTeam($teamName: String!, $divisionId: ID!) {
    addTeam(teamName: $teamName, divisionId: $divisionId) {
      _id
      name
      division {
        _id
      }
      payment
      wins
      losses
      draws
      totalPoints
    }   
  }
`

export const REMOVE_TEAM = gql`
  mutation removeTeam($teamId: ID!) {
    removeTeam(teamId: $teamId) {
      _id
    }
  }
`

export const ADD_DIVISION = gql`
  mutation addDivision($divisionName: String!, $divisionDay: String!) {
    addDivision(divisionName: $divisionName, divisionDay: $divisionDay) {
      _id
      name
      day
    }
  }
`

export const REMOVE_DIVISION = gql`
  mutation removeDivision($divisionId: ID!) {
    removeDivision(divisionId: $divisionId) {
      _id
    }
  }
`

export const ADD_GAME = gql`
  mutation addGame($gameTime: String!, $gameDate: String!, $teamOneId: String!, $teamTwoId: String!, $divisionId: ID!, $venue: String!) {
    addGame(gameTime: $gameTime, gameDate: $gameDate, teamOneId: $teamOneId, teamTwoId: $teamTwoId, divisionId: $divisionId, venue: $venue) {
      _id
      time
      date
      teamOne
      teamTwo
      venue
      scoreWinner
      scoreLoser
      winner
      loser
    }
  }
`

export const REMOVE_GAMES = gql`
  mutation removeGames($divisionId: ID!) {
    removeGames(divisionId: $divisionId) {
      _id
    }
  }
`

export const REMOVE_ARCHIVED_GAMES = gql`
  mutation removeArchivedGames($divisionId: ID!) {
    removeArchivedGames(divisionId: $divisionId) {
      _id
    }
  }
`

export const REMOVE_SINGLE_GAME = gql`
  mutation removeSingleGame($gameId: ID!) {
    removeSingleGame(gameId: $gameId) {
      _id
    }
  }
`

export const UPDATE_SINGLE_GAME = gql`
  mutation updateGames($divisionId: ID!, $gameId: ID!, $scoreWinner: Int!, $scoreLoser: Int!, $winner: String!, $loser: String!) {
    updateGames(divisionId: $divisionId, gameId: $gameId, scoreWinner: $scoreWinner, scoreLoser: $scoreLoser, winner: $winner, loser: $loser) {
      _id
      time
      date
      teamOne
      teamTwo
      venue
      scoreWinner
      scoreLoser
      winner
      loser
    }
  }
`

export const RESET_SEASON = gql`
  mutation resetSeason($divisionId: ID!) {
    resetSeason(divisionId: $divisionId) {
      _id
      division {
        _id
      }
      payment
      wins
      losses
      draws
      totalPoints
    }
  }
`

export const UPDATE_PAYMENT = gql`
  mutation updatePayment($teamId: ID!, $payment: Boolean) {
    updatePayment(teamId: $teamId, payment: $payment) {
      _id
      division {
        _id
        day
        name
      }
      payment
      wins
      losses
      draws
      totalPoints
    }
  }
`