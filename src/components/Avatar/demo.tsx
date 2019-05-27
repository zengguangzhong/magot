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
        <Avatar icon="user" />
        <Avatar text="USER" />
        <Avatar src={require('./avatar.png')} />
        <Avatar icon="user" style={{ backgroundColor: '#52c41a' }} />
      </div>
      <div className="demo-box">
        <Avatar radius={4} />
        <Avatar icon="user" radius={4} />
        <Avatar text="USER" radius={4} />
        <Avatar src={require('./avatar.png')} radius={4} />
        <Avatar icon="user" radius={4} style={{ backgroundColor: '#52c41a' }} />
      </div>
      <div className="demo-box">
        <Avatar icon="user" size="small" />`
        <Avatar icon="user" size="normal" />
        <Avatar icon="user" size="large" />
        <Avatar text="USER" size="small" />
        <Avatar text="USER" size="normal" />
        <Avatar text="USER" size="large" />
        <Avatar src={require('./avatar.png')} size="small" />
        <Avatar src={require('./avatar.png')} size="normal" />
        <Avatar src={require('./avatar.png')} size="large" />
      </div>
    </>
  );
}

export default AvatarDemo;
