import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer } from './reducer/notificationReducer'
import thunk from 'redux-thunk'
import blogReducer from './reducer/blogReducer'
import userReducer from './reducer/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
