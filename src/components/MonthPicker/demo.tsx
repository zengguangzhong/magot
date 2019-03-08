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
        <MonthPicker placeholder="select month" onChange={console.log} />
        <MonthPicker
          placeholder="select month"
          format="yyyy/MM"
          defaultValue="2019/01"
          onChange={console.log}
        />
        <MonthPicker
          placeholder="select month"
          format="MM/yyyy"
          onChange={console.log}
        />
        <MonthPicker defaultValue={new Date()} disabled={true} />
      </div>
      <div className="demo-box">
        <MonthPicker
          placeholder="select month"
          size="small"
          onChange={console.log}
        />
        <MonthPicker placeholder="select month" onChange={console.log} />
        <MonthPicker
          placeholder="select month"
          size="large"
          width={160}
          onChange={console.log}
        />
      </div>
    </>
  );
}

export default MonthPickerDemo;
