import { gql } from '@apollo/client';
export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerName
          name
          user
          fullName
          ratingAverage
          reviewCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;
