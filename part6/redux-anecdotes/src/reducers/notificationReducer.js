const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW':
      if (state.duration) clearTimeout(state.duration)
      return action.data
    case 'HIDE':
      return {}
    default:
      return state
  }
}

export const setNotification = (message, sec) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW',
      data: {
        message,
        duration: setTimeout(() => {
          dispatch({ type: 'HIDE' })
        }, sec * 1000),
      },
    })
  }
}

export default notificationReducer
