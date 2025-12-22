import {gql} from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      email
      admin
    }
  }
`;

export const QUERY_ME = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      admin
    }
  }
`;

export const QUERY_ALL_DIVISIONS = gql`
  query getDivisions {
    allDivisions {
      _id
      name
      day
    }
  }
`;

export const QUERY_SINGLE_DIVISION = gql`
  query getSingleDivision($divisionId: ID!) {
    division(divisionId: $divisionId) {
      _id
      name
      day
      teams {
        _id
        name
        payment
        wins
        losses
        draws
        totalPoints
      }
      games {
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
      playedGames {
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
  }
`;

export const QUERY_ALL_TEAMS = gql`
  query allTeams {
    allTeams {
      _id
      name
      division {
        _id
        name
        day
      }
      payment
      wins
      losses
      draws
      totalPoints
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query getSingleGame($gameId: ID!) {
    game(gameId: $gameId) {
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
`;