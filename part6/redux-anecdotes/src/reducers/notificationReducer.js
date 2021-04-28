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

export const show = (message) => ({
  type: 'SHOW',
  message,
})

export const hide = () => ({
  type: 'HIDE',
})

export default notificationReducer
