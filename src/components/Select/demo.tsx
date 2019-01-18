import React from 'react';
import Select from './Select';
import { Link } from 'react-router-dom';

function SelectDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Select />
      </div>
    </>
  );
}

export default SelectDemo;
