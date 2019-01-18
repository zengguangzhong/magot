import React from 'react';
import Radio from './Radio';
import { Link } from 'react-router-dom';

function RadioDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Radio />
      </div>
    </>
  );
}

export default RadioDemo;
