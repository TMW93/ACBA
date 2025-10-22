import {gql} from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId:ID!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      email
      teams
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
      }
    }
  }
`;

