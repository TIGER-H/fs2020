import usersService from '../services/users'
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'USERSINIT':
      return action.users
    default:
      return state
  }
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers()
    dispatch({
      type: 'USERSINIT',
      users,
    })
  }
}
export default usersReducer
