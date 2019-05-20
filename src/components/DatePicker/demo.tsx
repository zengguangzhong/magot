import React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from './DatePicker';
import MonthPicker from './MonthPicker';
import WeekPicker from './WeekPicker';
import RangePicker from './RangePicker';
import Button from '../Button';
import DateUtil from '../../utils/date';

function DatePickerDemo() {
  const today = DateUtil();
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
        <DatePicker defaultValue={today.to()} disabled={true} />
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
        <DatePicker
          placeholder="select date"
          size="small"
          onChange={console.log}
        />
        <DatePicker placeholder="select date" onChange={console.log} />
        <DatePicker
          placeholder="select date"
          size="large"
          onChange={console.log}
        />
      </div>
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
        <MonthPicker defaultValue={today.to()} disabled={true} />
        <MonthPicker
          placeholder="select month"
          size="small"
          onChange={console.log}
        />
        <MonthPicker placeholder="select month" onChange={console.log} />
        <MonthPicker
          placeholder="select month"
          size="large"
          onChange={console.log}
        />
      </div>
      <div className="demo-box">
        <WeekPicker placeholder="select week" onChange={console.log} />
        <WeekPicker
          placeholder="select week"
          format="yyyy - w week"
          defaultValue="2019/01"
          onChange={console.log}
        />
        <WeekPicker defaultValue={today.to()} disabled={true} />
        <WeekPicker
          placeholder="select week"
          size="small"
          onChange={console.log}
        />
        <WeekPicker placeholder="select week" onChange={console.log} />
        <WeekPicker
          placeholder="select week"
          size="large"
          onChange={console.log}
        />
      </div>
      <div className="demo-box">
        <RangePicker placeholder="select range" onChange={console.log} />
        <RangePicker
          placeholder="select range"
          defaultValue={[today.to(), today.addMonths(1)]}
          format="yyyy/MM/dd"
          separator="-"
          onChange={console.log}
        />
        <RangePicker
          defaultValue={[today.to(), today.addMonths(1)]}
          disabled={true}
        />
        <RangePicker
          placeholder="select range"
          size="small"
          onChange={console.log}
        />
        <RangePicker placeholder="select range" onChange={console.log} />
        <RangePicker
          placeholder="select range"
          size="large"
          onChange={console.log}
        />
      </div>
    </>
  );
}

function ControlledDatePicker() {
  const today = DateUtil();
  const [currentDate, setCurrentDate] = React.useState<Date | null>(today.to());
  return (
    <DatePicker
      placeholder="has children"
      value={currentDate}
      onChange={(date, dateString) => {
        console.log(date, dateString);
        setCurrentDate(date);
      }}>
      <Button type="link" onClick={() => setCurrentDate(today.subtract(1))}>
        昨天
      </Button>
      <Button type="link" onClick={() => setCurrentDate(today.to())}>
        今天
      </Button>
      <Button type="link" onClick={() => setCurrentDate(today.add(1))}>
        明天
      </Button>
      <Button type="link" onClick={() => setCurrentDate(null)}>
        清除
      </Button>
    </DatePicker>
  );
}

export default DatePickerDemo;
