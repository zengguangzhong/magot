import React from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import Button from '../Button';

const title = 'Notification Title';
const message =
  'Notification Message content, Notification Message content, Notification Message content.';

function NotificationDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Button
          type="primary"
          onClick={() => Notification.open({ title, message })}>
          Open notification
        </Button>
        <Button
          type="primary"
          onClick={() => Notification.open({ title, message, duration: 0 })}>
          Open notification(no autoclose)
        </Button>
        <Button onClick={() => Notification.info({ title, message })}>
          Info
        </Button>
        <Button onClick={() => Notification.success({ title, message })}>
          Success
        </Button>
        <Button onClick={() => Notification.error({ title, message })}>
          Error
        </Button>
        <Button onClick={() => Notification.warning({ title, message })}>
          Warning
        </Button>
      </div>
    </>
  );
}

export default NotificationDemo;
