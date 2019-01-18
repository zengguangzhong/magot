import React from 'react';
import Rate from './Rate';
import { Link } from 'react-router-dom';

function RateDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Rate />
      </div>
    </>
  );
}

export default RateDemo;
