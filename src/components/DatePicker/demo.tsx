import React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from './DatePicker';
import Button from '../Button';

function DatePickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <DatePicker placeholder="select date" onChange={console.log} />
        <DatePicker
          placeholder="select date"
          format="yyyy/MM/dd"
          defaultValue="2019/01/01"
          onChange={console.log}
        />
        <DatePicker
          placeholder="select date"
          format="MM/dd/yyyy"
          onChange={console.log}
        />
        <DatePicker defaultValue={new Date()} disabled={true} />
        <DatePicker
          placeholder="disabled dates"
          calendarProps={{ disableTodayAgo: true }}
          onChange={console.log}
        />
        <DatePicker
          placeholder="readonly"
          readOnly={true}
          onChange={console.log}
        />
        <ControlledDatePicker />
      </div>
      <div className="demo-box">
        <DatePicker
          placeholder="select date"
          size="small"
          onChange={console.log}
        />
        <DatePicker placeholder="select date" onChange={console.log} />
        <DatePicker
          placeholder="select date"
          size="large"
          width={160}
          onChange={console.log}
        />
      </div>
    </>
  );
}

function ControlledDatePicker() {
  const today = new Date();
  const fromDate = (d: Date, diff: number) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
  };
  const [currentDate, setCurrentDate] = React.useState<Date | null>(new Date());
  return (
    <DatePicker
      placeholder="has children"
      value={currentDate}
      // tslint:disable-next-line
      onChange={date => setCurrentDate(date)}>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(fromDate(today, -1))}>
        昨天
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(today)}>
        今天
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(fromDate(today, 1))}>
        明天
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(null)}>
        清除
      </Button>
    </DatePicker>
  );
}

export default DatePickerDemo;
