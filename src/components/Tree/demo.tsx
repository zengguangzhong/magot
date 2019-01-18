import React from 'react';
import Tree from './Tree';
import { Link } from 'react-router-dom';

function TreeDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Tree />
      </div>
    </>
  );
}

export default TreeDemo;
