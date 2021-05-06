import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core'
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
      <Paper>
        <a href={blog.url}>{blog.url}</a>

        <p>
          {blog.likes} {blog.likes === 0 ? 'like' : 'likes'}
          <Button
            variant='outlined'
            size='small'
            onClick={() => dispatch(updateBlog(blog))}
          >
            like
          </Button>
        </p>

        <p>added by {blog.user.name}</p>

        {user.name === blog.user.name && (
          <Button onClick={handleDelete} variant='outlined'>
            remove
          </Button>
        )}
        <br />
      </Paper>

      <b>comments</b>
      <form onSubmit={handleComment}>
        {/* <input {...newComment.input} />
         */}
        <TextField
          label='say something'
          {...newComment.input}
          variant='outlined'
          size='small'
        />
        <Button variant='outlined' color='default' type='submit'>
          comment
        </Button>
      </form>
      <Paper>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </Paper>
    </div>
  )
}
export default Blog
