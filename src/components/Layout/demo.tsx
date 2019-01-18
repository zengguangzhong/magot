import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';

function LayoutDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Layout />
      </div>
    </>
  );
}

export default LayoutDemo;
