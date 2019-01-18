import React from 'react';
import InputNumber from './InputNumber';
import { Link } from 'react-router-dom';

function InputNumberDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <InputNumber />
      </div>
    </>
  );
}

export default InputNumberDemo;
