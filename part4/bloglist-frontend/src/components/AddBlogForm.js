import React from 'react'

const AddBlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type='text'
          name='Title'
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AddBlogForm