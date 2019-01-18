import React from 'react';
import Collapse from './Collapse';
import { Link } from 'react-router-dom';

function CollapseDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Collapse />
      </div>
    </>
  );
}

export default CollapseDemo;
