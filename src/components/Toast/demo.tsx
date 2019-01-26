import React from 'react';
import { Link } from 'react-router-dom';
import Toast from './Toast';
import Button from '../Button';

function ToastDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Button
          type="primary"
          // tslint:disable
          onClick={() => Toast.info('This is a message of info')}>
          Info
        </Button>
        <Button
          type="success"
          // tslint:disable
          onClick={() => Toast.success('This is a message of success')}>
          Success
        </Button>
        <Button
          type="warning"
          // tslint:disable
          onClick={() => Toast.warning('This is a message of warning')}>
          Warning
        </Button>
        <Button
          type="danger"
          // tslint:disable
          onClick={() => Toast.error('This is a message of error')}>
          Error
        </Button>
      </div>
      <div className="demo-box">
        <Button
          type="primary"
          // tslint:disable
          onClick={() =>
            Toast.info('This is a message of info', undefined, true)
          }>
          Info
        </Button>
        <Button
          type="success"
          // tslint:disable
          onClick={() =>
            Toast.success('This is a message of success', undefined, true)
          }>
          Success
        </Button>
        <Button
          type="warning"
          // tslint:disable
          onClick={() =>
            Toast.warning('This is a message of warning', undefined, true)
          }>
          Warning
        </Button>
        <Button
          type="danger"
          // tslint:disable
          onClick={() =>
            Toast.error('This is a message of error', undefined, true)
          }>
          Error
        </Button>
      </div>
      <div className="demo-box">
        <Button
          type="primary"
          // tslint:disable
          onClick={() => Toast.info('This is a message of info', 10 * 1000)}>
          Info(10s)
        </Button>
        <Button
          type="primary"
          // tslint:disable
          onClick={() =>
            Toast.info(
              <>
                <div>This is a message of info</div>
                <div>This is a message of info</div>
              </>,
              undefined,
              true
            )
          }>
          Info(multiline)
        </Button>
        <Button
          type="primary"
          // tslint:disable
          onClick={() =>
            Toast.info('This is a message of info', undefined, true, () => {
              Toast.info('Closed');
            })
          }>
          Info(onClose)
        </Button>
      </div>
    </>
  );
}

export default ToastDemo;
