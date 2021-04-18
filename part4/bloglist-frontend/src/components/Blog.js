import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
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
            {blog.user.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
