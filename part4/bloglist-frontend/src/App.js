import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('savedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const response = await blogService.create(blog)
      setBlogs([...blogs, response])
    } catch (exception) {
      console.log(exception.message)
    }

    setMessage('You have created one blog')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlogForm = () => (
    <form onSubmit={createBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type='text'
          name='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('savedUser', JSON.stringify(user))

      setMessage('login success')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    blogService.setToken('')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} err={true} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification message={message} />
      <Notification message={errorMessage} err={true} />
      <h2>blogs</h2>
      <div>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {/* 渲染的时候不能是object */}
      </div>

      {addBlogForm()}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
