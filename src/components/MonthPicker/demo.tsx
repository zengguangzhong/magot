import React from 'react';
import MonthPicker from './MonthPicker';
import { Link } from 'react-router-dom';

function MonthPickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <MonthPicker />
      </div>
    </>
  );
}

export default MonthPickerDemo;
