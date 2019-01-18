import React from 'react';
import Empty from './Empty';
import { Link } from 'react-router-dom';

function EmptyDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Empty />
      </div>
    </>
  );
}

export default EmptyDemo;
