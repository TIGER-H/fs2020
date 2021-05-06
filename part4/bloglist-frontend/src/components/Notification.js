import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.duration === 0) return null

  // if (notification.message === null) return null //不然会一直有一个框在上面
  if (notification.error)
    return <Alert severity='error'>{notification.message}</Alert>
  if (notification.error === false)
    return <Alert severity='success'>{notification.message}</Alert>
  return null
}

export default Notification
