import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

function IconDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Icon name="scan" />
        <Icon name="search" />
        <Icon name="download" />
        <Icon name="loading" spin={true} />
        <Icon name="chat" fontSize={32} style={{ color: '#1890ff' }} />
      </div>
    </>
  );
}

export default IconDemo;
