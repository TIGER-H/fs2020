import { useQuery } from '@apollo/client'
import React from 'react'
import { QUERY_ME } from '../queries'
const Recommend = (props) => {
  const user = useQuery(QUERY_ME)
  //   console.log(user)
  if (!props.show) {
    return null
  }
  const books = props.books.data.allBooks
  const favoriteGenre = user.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>

      <table>
        <tbody>
          <tr>
            <td>
              books in your favourite genre <b>{favoriteGenre}</b>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) =>
            a.genres.includes(favoriteGenre) ? (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
