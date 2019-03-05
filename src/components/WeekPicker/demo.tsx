import React from 'react';
import WeekPicker from './WeekPicker';
import { Link } from 'react-router-dom';

function WeekPickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <WeekPicker />
      </div>
    </>
  );
}

export default WeekPickerDemo;
