import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/loginform'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducer/blogReducer'
import { logged, logout } from './reducer/userReducer'

const App = () => {
  const dispatch = useDispatch()

  // const [blogs, setBlogs] = useState([])
  const blogs = useSelector((state) => state.blogs)
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('savedUser')
    if (loggedUserJSON) {
      const loggeduser = JSON.parse(loggedUserJSON)
      dispatch(logged(loggeduser))
    }
  }, [])

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <p>{user.username} logged in</p>
            <button onClick={() => dispatch(logout())}>logout</button>
            {/* 渲染的时候不能是object */}
          </div>

          <CreateBlog />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
