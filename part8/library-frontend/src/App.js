import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { QUERY_AUTHOR, QUERY_BOOK } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(QUERY_AUTHOR)
  const books = useQuery(QUERY_BOOK)
  // console.log(authors.data) //这里authors有个获取的过程 怎么确保传进去的是获取到的呢？
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      setToken(token)
      setPage('authors')
    }
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      {authors.data && <Authors show={page === 'authors'} authors={authors} />}

      {books.data && <Books show={page === 'books'} books={books} />}

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
