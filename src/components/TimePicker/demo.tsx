import React from 'react';
import TimePicker from './TimePicker';
import { Link } from 'react-router-dom';

function TimePickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <TimePicker />
      </div>
    </>
  );
}

export default TimePickerDemo;
