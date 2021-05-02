import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.duration === 0) return null

  // if (notification.message === null) return null //不然会一直有一个框在上面
  if (notification.error)
    return <div className='error'>{notification.message}</div>
  if (notification.error === false)
    return <div className='success'>{notification.message}</div>
  return null
}

export default Notification
