// src/components/Notifications/NotificationCenter.jsx
import { useEffect, useState } from 'react';
import { getData, dismissNotification } from '../../utils/localStorageUtils';
import '../../styles/main.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getData('notifications'));
  }, []);

  const handleDismiss = (id) => {
    dismissNotification(id);
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="notification-center">
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul>
        {notifications.map(n => (
          <li key={n.id}>
            {n.message} ({new Date(n.timestamp).toLocaleString()})
            <button onClick={() => handleDismiss(n.id)}>Dismiss</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;