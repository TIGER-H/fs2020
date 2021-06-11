import { gql } from '@apollo/client';
export const GET_REPOSITORIES = gql`
  query (
    $input_dir: OrderDirection
    $input_by: AllRepositoriesOrderBy
    $input_search: String
  ) {
    repositories(
      orderDirection: $input_dir
      orderBy: $input_by
      searchKeyword: $input_search
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPO = gql`
  query repo($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_AUTH_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;
