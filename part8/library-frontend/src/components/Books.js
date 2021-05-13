import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all')

  if (!props.show) {
    return null
  }

  const books = props.books.data.allBooks
  // console.log(books)

  let allGenres = []
  books.forEach((book) => {
    allGenres = [
      ...allGenres,
      ...book.genres.filter((genre) => !allGenres.includes(genre)),
    ]
  })
  // console.log(allGenres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <td>
              in genre <b>{genre}</b>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) =>
            a.genres.includes(genre) || genre === 'all' ? (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('all')}>all genres</button>
    </div>
  )
}

export default Books
