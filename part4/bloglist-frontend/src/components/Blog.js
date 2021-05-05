import { useDispatch, useSelector } from 'react-redux'
import { deleteBLog, updateBlog } from '../reducer/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  if (!blog) return null

  const handleDelete = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      dispatch(deleteBLog(blog))
  }

  return (
    <div>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} {blog.likes === 0 ? 'like' : 'likes'}
        <button onClick={() => dispatch(updateBlog(blog))}>like</button>
      </p>

      <p>added by {blog.user.name}</p>
      {user.name === blog.user.name && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  )
}
export default Blog
