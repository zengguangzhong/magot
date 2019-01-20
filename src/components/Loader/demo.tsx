import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

function LoaderDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Loader />
      </div>
    </>
  );
}

export default LoaderDemo;
