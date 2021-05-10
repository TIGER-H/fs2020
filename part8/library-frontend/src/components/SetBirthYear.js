import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { EDIT_BORN, QUERY_AUTHOR } from '../queries'
import React from 'react'

const SetBirthYear = () => {
  const [author, setAuthor] = useState('')
  const [bornTo, setBornTo] = useState('')
  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: QUERY_AUTHOR }],
  })

  const authors = useQuery(QUERY_AUTHOR)

  const handleBirthChange = (event) => {
    event.preventDefault()

    changeBorn({ variables: { name: author, setBornTo: parseInt(bornTo) } })

    setAuthor('')
    setBornTo('')
  }

  if (!authors.data.allAuthors) return null

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleBirthChange}>
        <div>
          name
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='text'
            value={bornTo}
            onChange={({ target }) => setBornTo(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
