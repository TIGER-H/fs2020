import React, { useState } from 'react'
import { createBlog } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/hooks'
import { Button, TextField } from '@material-ui/core'

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
    )
    ;[title, author, url].map((item) => item.reset())
  }

  return (
    <div>
      <br />
      <div style={hideWhenVisible}>
        <Button variant='outlined' onClick={() => setCreateVisible(true)}>
          new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <h2>create new</h2>
          <div>
            <TextField label='title' {...title.input} variant='outlined' />
            {/* title:
            <input id='title' {...title.input} /> */}
          </div>
          <div>
            <TextField label='author' {...author.input} variant='outlined' />
            {/* author:
            <input id='author' {...author.input} /> */}
          </div>
          <div>
            <TextField label='url' {...url.input} variant='outlined' />
            {/* url:
            <input id='url' {...url.input} /> */}
          </div>
          <br />
          <Button variant='outlined' type='submit'>
            create
          </Button>
          <Button variant='outlined' onClick={() => setCreateVisible(false)}>
            cancel
          </Button>
          <br />
        </form>
        <br />
      </div>
    </div>
  )
}

// CreateBlog.propTypes = {
//   addBlog: PropTypes.func.isRequired,
// }

export default CreateBlog
