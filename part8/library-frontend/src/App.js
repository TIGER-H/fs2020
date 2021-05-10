import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const QUERY_AUTHOR = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(QUERY_AUTHOR)
  // console.log(authors.data) //这里authors有个获取的过程 怎么确保传进去的是获取到的呢？

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      {authors.data && <Authors show={page === 'authors'} authors={authors} />}

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
