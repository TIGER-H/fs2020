import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/loginform'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducer/blogReducer'
import { logged, logout } from './reducer/userReducer'
import Users from './components/users'
import { initUsers } from './reducer/usersReducer'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './components/user'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { Container } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const matchUser = useRouteMatch('/users/:id')
  const userToShow = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogToShow = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
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
    <Container>
      <div>
        <Notification />
        <Navigation />

        {!user ? (
          <div>
            <h1>blogs app</h1>
            <LoginForm />
          </div>
        ) : (
          <div>
            <Switch>
              <Route path='/users/:id'>
                <User user={userToShow} />
              </Route>
              <Route path='/users'>
                <Users />
              </Route>
              <Route path='/blogs/:id'>
                {blogToShow ? <Blog blog={blogToShow} /> : <Redirect to='/' />}
              </Route>
              <Route path='/'>
                <CreateBlog />
                <Blogs />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
