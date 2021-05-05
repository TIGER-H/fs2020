import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducer/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <div className='NavBar'>
      <Link to='/' className='blogNav'>blogs</Link>
      <Link to='/users' className='usersNav'>users</Link>
      {user.name} logged in
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}
export default Navigation
