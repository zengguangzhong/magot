import React from 'react';
import DateTimePicker from './DateTimePicker';
import { Link } from 'react-router-dom';

function DateTimePickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <DateTimePicker />
      </div>
    </>
  );
}

export default DateTimePickerDemo;
