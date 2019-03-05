import React from 'react';
import RangePicker from './RangePicker';
import { Link } from 'react-router-dom';

function RangePickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <RangePicker />
      </div>
    </>
  );
}

export default RangePickerDemo;
