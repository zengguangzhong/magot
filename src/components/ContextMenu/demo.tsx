import React from 'react';
import ContextMenu from './ContextMenu';
import { Link } from 'react-router-dom';

function ContextMenuDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <ContextMenu />
      </div>
    </>
  );
}

export default ContextMenuDemo;
