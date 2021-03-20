const NotificationMessage = ({ message }) => {
    if (message === null) return null;
    return <div className="error">{message}</div>;
  };

export default NotificationMessage