import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/hooks'
import { login } from '../reducer/userReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const submitCreds = (event) => {
    event.preventDefault()
    dispatch(
      login({
        username: username.input.value,
        password: password.input.value,
      })
    )
    username.reset()
    password.reset()
  }

  return (
    <form onSubmit={submitCreds}>
      <h2>log in to application</h2>
      <div>
        <TextField variant='outlined' label='username' {...username.input} />
        {/* <input {...username.input} /> */}
      </div>
      <div>
        <TextField variant='outlined' label='password' {...password.input} />
        {/* password
        <input {...password.input} /> */}
      </div>
      <br />
      <Button variant='contained' color='primary' type='submit'>
        login
      </Button>
    </form>
  )
}

// LoginForm.propTypes = {
//   login: PropTypes.func.isRequired,
// }

export default LoginForm
