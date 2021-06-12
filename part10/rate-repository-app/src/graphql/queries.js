import { gql } from "@apollo/client";
export const GET_REPOSITORIES = gql`
  query (
    $input_dir: OrderDirection
    $input_by: AllRepositoriesOrderBy
    $input_search: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $input_dir
      orderBy: $input_by
      searchKeyword: $input_search
      first: $first
      after: $after
    ) {
      totalCount
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
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_REPO = gql`
  query repo($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
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
  query getAuthUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            user {
              id
              username
            }
            repository {
              id
            }
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;
