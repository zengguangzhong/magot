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
          // tslint:disable-next-line
          onClick={() => Notification.open({ title, message })}>
          Open notification
        </Button>
        <Button
          type="primary"
          // tslint:disable-next-line
          onClick={() => Notification.open({ title, message, duration: 0 })}>
          Open notification(no autoclose)
        </Button>
        <Button
          // tslint:disable-next-line
          onClick={() => Notification.info({ title, message, duration: 0 })}>
          Info
        </Button>
        <Button
          // tslint:disable-next-line
          onClick={() => Notification.success({ title, message, duration: 0 })}>
          Success
        </Button>
        <Button
          // tslint:disable-next-line
          onClick={() => Notification.error({ title, message, duration: 0 })}>
          Error
        </Button>
        <Button
          // tslint:disable-next-line
          onClick={() => Notification.warning({ title, message, duration: 0 })}>
          Warning
        </Button>
      </div>
    </>
  );
}

export default NotificationDemo;
