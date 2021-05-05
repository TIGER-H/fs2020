import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE': {
      // return [...state, action.data]
      // return state.concat(action.data)
      return action.newState
    }
    case 'UPDATE': {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    }
    case 'REMOVE': {
      return state.filter((blog) => blog.id !== action.id)
    }

    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data,
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    await blogService.create(content)
    const newState = await blogService.getAll()
    dispatch({
      type: 'CREATE',
      newState,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.update(blog)
    dispatch({
      type: 'UPDATE',
      data,
    })
  }
}

export const deleteBLog = (content) => {
  return async (dispatch) => {
    await blogService.deleteOne(content.id)
    dispatch({
      type: 'REMOVE',
      id: content.id,
    })
  }
}

export default blogReducer
