const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.message
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, sec) => {
  return dispatch => {
    dispatch({
      type: 'SHOW',
      message,
    })
    setTimeout(() => { dispatch({ type: 'HIDE' }) }, sec * 1000);
  }
}

export default notificationReducer
