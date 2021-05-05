import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBLog, updateBlog } from '../reducer/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    // updateBlog(updatedBlog, blog.id)
    console.log(updatedBlog);
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      dispatch(deleteBLog(blog))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisibility(!visibility)}>
          {visibility ? 'hide' : 'show'}
        </button>
      </div>
      <div>
        {visibility && (
          <div>
            {blog.url} <br />
            {blog.likes}
            <button onClick={addLike}>like</button> <br />
            {blog.user.name} <br />
            {blog.user.username === user.username && (
              <button onClick={handleDelete}>remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
