import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation GetToken($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
