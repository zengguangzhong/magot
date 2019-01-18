import React from 'react';
import DatePicker from './DatePicker';
import { Link } from 'react-router-dom';

function DatePickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <DatePicker />
      </div>
    </>
  );
}

export default DatePickerDemo;
