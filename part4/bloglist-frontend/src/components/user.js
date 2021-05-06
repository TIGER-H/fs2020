import { Button, Paper } from '@material-ui/core'

const User = ({ user }) => {
  if (!user) return null
  return (
    <Paper>
      <Button variant='outlined'>{user.name}</Button>
      <br />
      <b>added blogs</b>
      {user.blogs.length !== 0 &&
        user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      {!user.blogs.length && <p>no blog yet</p>}
    </Paper>
  )
}
export default User
