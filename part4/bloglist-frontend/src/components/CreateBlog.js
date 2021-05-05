import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'

const CreateBlog = () => {
  const dispatch = useDispatch()
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [createVisible, setCreateVisible] = useState(false)

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    )
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <h2>create new</h2>
          <div>
            title:
            <input
              id='title'
              type='text'
              name='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id='author'
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id='url'
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

// CreateBlog.propTypes = {
//   addBlog: PropTypes.func.isRequired,
// }

export default CreateBlog
