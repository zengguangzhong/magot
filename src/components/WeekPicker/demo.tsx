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
        <WeekPicker placeholder="select week" onChange={console.log} />
        <WeekPicker
          placeholder="select week"
          format="yyyy - w week"
          defaultValue="2019/01"
          onChange={console.log}
        />
        <WeekPicker defaultValue={new Date()} disabled={true} />
      </div>
      <div className="demo-box">
        <WeekPicker
          placeholder="select week"
          size="small"
          onChange={console.log}
        />
        <WeekPicker placeholder="select month" onChange={console.log} />
        <WeekPicker
          placeholder="select week"
          size="large"
          width={160}
          onChange={console.log}
        />
      </div>
    </>
  );
}

export default WeekPickerDemo;
