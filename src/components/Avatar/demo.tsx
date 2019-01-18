import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

function AvatarDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Avatar />
      </div>
    </>
  );
}

export default AvatarDemo;
