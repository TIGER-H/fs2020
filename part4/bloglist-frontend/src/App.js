import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/loginform'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducer/blogReducer'
import { logged, logout } from './reducer/userReducer'
import Users from './components/users'
import { initUsers } from './reducer/usersReducer'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './components/user'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const matchUser = useRouteMatch('/users/:id')
  const userToShow = matchUser
    ? users.find((u) => u.id === (matchUser.params.id))
    : null


  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initBlogs())
    dispatch(initUsers())
    const loggedUserJSON = window.localStorage.getItem('savedUser')
    if (loggedUserJSON) {
      const loggeduser = JSON.parse(loggedUserJSON)
      dispatch(logged(loggeduser))
    }
  }, [dispatch])

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
          <Switch>
            <Route path='/users/:id'>
              <User user={userToShow} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <CreateBlog />

              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
