import React from 'react';
import RadioGroup from './RadioGroup';
import { Link } from 'react-router-dom';

function RadioGroupDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <RadioGroup />
      </div>
    </>
  );
}

export default RadioGroupDemo;
