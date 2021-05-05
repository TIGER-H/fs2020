const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h3>{user.name}</h3>
      <b>added blogs</b>
      {user.blogs.length !==0 && user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
      {!user.blogs.length && <p>no blog yet</p>}
    </div>
  )
}
export default User
