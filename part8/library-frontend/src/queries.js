import { gql } from '@apollo/client'

export const QUERY_ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const QUERY_AUTHOR = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`
export const QUERY_BOOK = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
