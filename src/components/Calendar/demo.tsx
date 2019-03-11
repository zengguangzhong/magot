import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import Button from '../Button';
import * as dateUtil from '../../utils/date';

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
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box demo-flex">
        <Calendar onChange={console.log} />
        <Calendar defaultValue={dateUtil.addDays(3)} onChange={console.log} />
        <Calendar disableTodayAgo={true} onChange={console.log} />
        <Calendar
          todayText="今天"
          highlightToday={false}
          onChange={console.log}
        />
        <Calendar weekStart={1} onChange={console.log} />
        <Calendar hideWeekBox={true} hideHeader={true} onChange={console.log} />
        <Calendar
          headerYearFormatter={yearFormatter}
          headerMonthFormatter={monthFormatter}
          onChange={console.log}
        />
        <Calendar
          // tslint:disable-next-line
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
        <Calendar.Week defaultValue={new Date()} onChange={console.log} />
      </div>
    </>
  );
}

function ControlledCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  return (
    <Calendar
      value={currentDate}
      highlightToday={false}
      // tslint:disable-next-line
      onChange={date => {
        console.log(date);
        setCurrentDate(date);
      }}>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(dateUtil.subtractDays(1))}>
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
        onClick={() => setCurrentDate(dateUtil.addDays(1))}>
        明天
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(null)}>
        清除
      </Button>
    </Calendar>
  );
}

function ControlledLocalizeCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  return (
    <Calendar
      value={currentDate}
      weekFormatter={weekFormatter}
      monthFormatter={monthFormatter}
      headerYearFormatter={yearFormatter}
      headerMonthFormatter={monthFormatter}
      // tslint:disable-next-line
      onChange={date => {
        console.log(date);
        setCurrentDate(date);
      }}>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(dateUtil.subtractDays(1))}>
        Yesterday
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(today)}>
        Today
      </Button>
      <Button
        type="link"
        // tslint:disable-next-line
        onClick={() => setCurrentDate(dateUtil.addDays(1))}>
        Tomorrow
      </Button>
    </Calendar>
  );
}

export default CalendarDemo;
