import React from 'react';
import Notification from './Notification';
import { Link } from 'react-router-dom';

function NotificationDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Notification />
      </div>
    </>
  );
}

export default NotificationDemo;
