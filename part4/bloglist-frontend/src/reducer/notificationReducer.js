const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW': //show notification
    {
      if (state.duration) {
        clearTimeout(state.duration)
      }
      return action.data
    }
    case 'HIDE':
      return {}
    default:
      return state
  }
}

const hide = () => ({ type: 'HIDE' })

const show = (message, error = false, duration = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      data: {
        message,
        error,
        duration: setTimeout(() => {
          dispatch(hide())
        }, duration * 1000),
      },
    })
  }
}

export { notificationReducer, show, hide }
