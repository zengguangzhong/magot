import React from 'react';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

function TabsDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Tabs />
      </div>
    </>
  );
}

export default TabsDemo;
