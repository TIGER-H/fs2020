import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer } from './reducer/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
