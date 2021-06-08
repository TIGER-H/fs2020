import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation GetToken($input: AuthorizeInput) {
    authorize(credentials: $input) {
      accessToken
    }
  }
`;
