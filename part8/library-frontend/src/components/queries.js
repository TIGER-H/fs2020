import { gql } from '@apollo/client'

export const QUERY_AUTHOR = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const QUERY_BOOK = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`
