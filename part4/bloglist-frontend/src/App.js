import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/loginform'
import './index.css'
import { useDispatch } from 'react-redux'
import { show } from './reducer/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('savedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      // noti('login success')
      dispatch(show('login success'))
    } catch (err) {
      // noti('wrong username/password', true)
      dispatch(show('wrong username/password', true))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('savedUser')
    blogService.setToken('')
    setUser(null)
    // noti('logged out success')
    dispatch(show('logged out success'))
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      // setBlogs([...blogs, response])
      setBlogs(await blogService.getAll())
      // noti(`${response.title} by ${response.author} has been created!`)
      dispatch(
        show(`${response.title} by ${response.author} has been created!`)
      )
    } catch (error) {
      // noti(error.message, true)
      dispatch(show(error.message, true))
    }
  }

  const updateBlog = async (updatedBlog, id) => {
    try {
      await blogService.update(updatedBlog, id)
      setBlogs(await blogService.getAll())
    } catch (error) {
      // noti(exception.message, true)
      dispatch(show(error.message, true))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteOne(blog.id)
      setBlogs(blogs.filter(b=>b.id !== blog.id))
      dispatch(show(`${blog.title} removed!`))
    } catch (error) {
      // noti(exception.message, true)
      dispatch(show(error.message, true))
    }
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {!user ? (
        <LoginForm login={handleLogin} />
      ) : (
        <div>
          <div>
            <p>{user.username} logged in</p>
            <button onClick={handleLogout}>logout</button>
            {/* 渲染的时候不能是object */}
          </div>

          <CreateBlog addBlog={createBlog} />

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
