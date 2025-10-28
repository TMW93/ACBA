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