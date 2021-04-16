const Notification = ({ message, err = false }) => {
  if (message === null) return null //不然会一直有一个框在上面
  if (err) return <div className={err ? 'error' : 'success'}>{message}</div>
  return <div className='success'>{message}</div>
}

export default Notification
