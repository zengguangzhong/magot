import React from 'react';
import Password from './Password';
import { Link } from 'react-router-dom';

function PasswordDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Password />
      </div>
    </>
  );
}

export default PasswordDemo;
