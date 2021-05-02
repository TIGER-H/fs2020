import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
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
      user: blog.user.id,
      likes: blog.likes ? blog.likes + 1 : 1,
      author: blog.author,
      url: blog.url,
      title: blog.title,
    }
    updateBlog(updatedBlog, blog.id)
  }

  const handleDelete = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      deleteBlog(blog)
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
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
