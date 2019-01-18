import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function LoadingDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Loading />
      </div>
    </>
  );
}

export default LoadingDemo;
