import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/hooks'
import { addComment, deleteBLog, updateBlog } from '../reducer/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const newComment = useField('text')
  if (!blog) return null

  const handleDelete = () => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) &&
      dispatch(deleteBLog(blog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, newComment.input.value))
    newComment.reset()
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
      <br />
      <b>comments</b>
      <form onSubmit={handleComment}>
        <input {...newComment.input} />
        <button type='submit'>comment</button>
      </form>
      {blog.comments.map((comment, i) => (
        <li key={i}>{comment}</li>
      ))}
    </div>
  )
}
export default Blog
