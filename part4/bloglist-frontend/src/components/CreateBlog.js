import React, { useState } from 'react'
import { createBlog } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/hooks'

const CreateBlog = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [createVisible, setCreateVisible] = useState(false)

  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.input.value,
        author: author.input.value,
        url: url.input.value,
      })
    );
    [title, author, url].map((item) => item.reset())
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
            <input id='title' {...title.input} />
          </div>
          <div>
            author:
            <input id='author' {...author.input} />
          </div>
          <div>
            url:
            <input id='url' {...url.input} />
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
