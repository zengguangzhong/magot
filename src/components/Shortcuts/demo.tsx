import React from 'react';
import Shortcuts from './Shortcuts';
import { Link } from 'react-router-dom';

function ShortcutsDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Shortcuts />
      </div>
    </>
  );
}

export default ShortcutsDemo;
