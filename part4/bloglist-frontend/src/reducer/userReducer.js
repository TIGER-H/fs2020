import loginService from '../services/login'
import blogService from '../services/blogs'
import { show } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGGED':
      return action.user
    case 'LOGOUT':
      return null

    default:
      return state
  }
}
export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('savedUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      user,
    })
    await blogService.setToken(user.token)
    dispatch(show('login success'))
  } catch (err) {
    dispatch(show('wrong username/password', true))
  }
}

export const logged = (user) => async (dispatch) => {
  blogService.setToken(user.token)
  dispatch({
    type: 'LOGGED',
    user,
  })
}

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem('savedUser')
  await blogService.setToken('')
  dispatch({
    type: 'LOGOUT',
  })
  dispatch(show('logged out success'))
}

export default userReducer
