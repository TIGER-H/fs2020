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
        username
        <input {...username.input} />
      </div>
      <div>
        password
        <input {...password.input} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

// LoginForm.propTypes = {
//   login: PropTypes.func.isRequired,
// }

export default LoginForm
