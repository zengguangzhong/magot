import React from 'react';
import Toast from './Toast';
import { Link } from 'react-router-dom';

function ToastDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Toast />
      </div>
    </>
  );
}

export default ToastDemo;
