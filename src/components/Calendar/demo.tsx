import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import Button from '../Button';

function CalendarDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box demo-float">
        <Calendar onChange={console.log} />
        <Calendar defaultValue="2019/03/15" onChange={console.log} />
        <Calendar disableTodayAgo={true} onChange={console.log} />
        <Calendar
          defaultValue="2019/03/15"
          todayText="今天"
          highlightToday={false}
          onChange={console.log}
        />
        <Calendar weekStart={1} onChange={console.log} />
        <Calendar hideWeekBox={true} hideHeader={true} onChange={console.log} />
        <Calendar
          formatHeaderYear="yyyy"
          formatHeaderMonth="MM"
          onChange={console.log}
        />
        <Calendar
          // tslint:disable-next-line
          disabledDate={date => date.getDate() % 2 !== 0}
          onChange={console.log}
        />
        <Calendar
          // tslint:disable-next-line
          dateFormatter={date => date.getDate() + '日'}
          // tslint:disable-next-line
          weekFormatter={value => 'Su Mo Tu We Th Fr Sa'.split(' ')[value]}
          onChange={console.log}
        />
      </div>
      <div className="demo-box">
        <ControlledCalendar />
      </div>
    </>
  );
}

function ControlledCalendar() {
  const today = new Date();
  const fromDate = (d: Date, diff: number) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
  };
  const [currentDate, setCurrentDate] = React.useState(new Date('2019/03/15'));
  return (
    <>
      <Calendar value={currentDate} onChange={console.log} />
      <Button
        type="primary"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(fromDate(today, -1))}>
        Yesterday
      </Button>
      <Button
        type="primary"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(today)}>
        Today
      </Button>
      <Button
        type="primary"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(fromDate(today, 1))}>
        Tomorrow
      </Button>
    </>
  );
}

export default CalendarDemo;
