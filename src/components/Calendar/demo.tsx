import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import Button from '../Button';
import DateUtil from '../../utils/date';

function yearFormatter(year: number) {
  return '' + year;
}

function monthFormatter(month: number) {
  return 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')[month];
}

function weekFormatter(day: number) {
  return 'Su Mo Tu We Th Fr Sa'.split(' ')[day];
}

function dateFormatter(date: Date) {
  return date.getDate() + '日';
}

function CalendarDemo() {
  const today = DateUtil();
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box demo-flex">
        <Calendar onChange={console.log} />
        <Calendar value={today.add(3)} onChange={console.log} />
        <Calendar disableTodayAgo={true} onChange={console.log} />
        <Calendar todayText="今天" activeToday={false} onChange={console.log} />
        <Calendar weekStart={1} onChange={console.log} />
        <Calendar hideWeekBox={true} hideHeader={true} onChange={console.log} />
        <Calendar
          headerYearFormatter={yearFormatter}
          headerMonthFormatter={monthFormatter}
          onChange={console.log}
        />
        <Calendar
          disabledDate={date => date.getDate() % 2 !== 0}
          onChange={console.log}
        />
        <Calendar
          dateFormatter={dateFormatter}
          weekFormatter={weekFormatter}
          onChange={console.log}
        />
      </div>
      <div className="demo-box">
        <ControlledCalendar />
        <ControlledLocalizeCalendar />
      </div>
      <div className="demo-box">
        <Calendar.Month onChange={console.log} />
        <Calendar.Month
          monthFormatter={monthFormatter}
          headerYearFormatter={yearFormatter}
          onChange={console.log}
        />
        <Calendar.Year onChange={console.log} />
        <Calendar.Decade onChange={console.log} />
        <Calendar.Week value={today.to()} onChange={console.log} />
        <Calendar.Range
          value={[today.to(), today.add(10)]}
          onChange={console.log}
        />
      </div>
    </>
  );
}

function ControlledCalendar() {
  const today = DateUtil();
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  return (
    <Calendar
      value={currentDate}
      activeToday={false}
      onChange={date => {
        console.log(date);
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
    </Calendar>
  );
}

function ControlledLocalizeCalendar() {
  const today = DateUtil();
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  return (
    <Calendar
      value={currentDate}
      weekFormatter={weekFormatter}
      monthFormatter={monthFormatter}
      headerYearFormatter={yearFormatter}
      headerMonthFormatter={monthFormatter}
      onChange={date => {
        console.log(date);
        setCurrentDate(date);
      }}>
      <Button type="link" onClick={() => setCurrentDate(today.subtract(1))}>
        Yesterday
      </Button>
      <Button type="link" onClick={() => setCurrentDate(today.to())}>
        Today
      </Button>
      <Button type="link" onClick={() => setCurrentDate(today.add(1))}>
        Tomorrow
      </Button>
    </Calendar>
  );
}

export default CalendarDemo;
