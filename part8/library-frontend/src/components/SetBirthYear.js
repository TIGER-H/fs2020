import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { EDIT_BORN, QUERY_AUTHOR } from '../queries'
import React from 'react'
import Select from 'react-select'

const SetBirthYear = () => {
  const [author, setAuthor] = useState('')
  const [bornTo, setBornTo] = useState('')
  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: QUERY_AUTHOR }],
  })

  const authors = useQuery(QUERY_AUTHOR)

  const handleBirthChange = (event) => {
    event.preventDefault()
    console.log(author, bornTo);

    changeBorn({ variables: { name: author.value, setBornTo: parseInt(bornTo) } })

    setAuthor('')
    setBornTo('')
  }

  if (!authors.data.allAuthors) return null

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleBirthChange}>
        <Select
          value={author}
          onChange={setAuthor}
          options={authors.data.allAuthors.map((author) => ({
            value: author.name,
            label: author.name,
          }))}
        />
        <div>
          born
          <input
            type='number'
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
