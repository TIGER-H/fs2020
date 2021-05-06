import {
  AppBar,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducer/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <ButtonGroup
          color='inherit'
          aria-label='outlined primary button group'
          size='small'
        >
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        </ButtonGroup>
        <Button color='inherit'>logged in as {user.name}</Button>
        <ButtonGroup
          color='inherit'
          aria-label='outlined primary button group'
          size='small'
        >
          <Button color='inherit' onClick={() => dispatch(logout())}>
            logout
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  )
}
export default Navigation
