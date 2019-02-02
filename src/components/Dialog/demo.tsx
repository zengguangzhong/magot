import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from './Dialog';
import Button from '../Button';
import Toast from '../Toast';

function DialogDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Button onClick={handleInfoBtnClick}>Info</Button>
        <Button onClick={handleSuccessBtnClick}>Success</Button>
        <Button onClick={handleErrorBtnClick}>Error</Button>
        <Button onClick={handleWarningBtnClick}>Warning</Button>
        <Button onClick={handleConfirmBtnClick}>Confirm</Button>
      </div>
    </>
  );
}

const content =
  'This is a content, This is a content, This is a content, This is a content, This is a content.';

function handleInfoBtnClick() {
  Dialog.info({
    title: 'This is a notification message',
    content,
  });
}

function handleSuccessBtnClick() {
  Dialog.success({
    title: 'This is a success message',
    content,
  });
}

function handleErrorBtnClick() {
  Dialog.error({
    title: 'This is a error message',
    content,
  });
}

function handleWarningBtnClick() {
  Dialog.warning({
    title: 'This is a warning message',
    content,
  });
}

function handleConfirmBtnClick() {
  Dialog.confirm({
    title: 'Do you want to delete the content?',
    content,
    onOk() {
      Toast.success('Deleted!');
    },
    onCancel() {
      Toast.info('Cancel delete.');
    },
  });
}

export default DialogDemo;
