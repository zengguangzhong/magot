import React from 'react';
import Calendar from './Calendar';
import { Link } from 'react-router-dom';

function CalendarDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Calendar />
      </div>
    </>
  );
}

export default CalendarDemo;
