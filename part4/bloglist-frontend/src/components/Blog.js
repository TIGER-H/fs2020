import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {

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
        {visibility && <div>
          {blog.url} <br/>
          {blog.likes} 
          <button onClick={addLike}>like</button> <br/>
          {blog.user.name}
        </div> }
      </div>
    </div>
  )
}

export default Blog
