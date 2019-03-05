import React from 'react';
import cx from 'classnames';

import Button from '../Button';
import * as component from '../component';
import { useChanges } from '../../hooks/changes';
import dateFormatter from '../../utils/date-formatter';

import './Calendar.less';

export interface CalendarProps extends component.BaseComponent {
  /**
   * 默认日期
   */
  defaultValue?: string | number | Date;

  /**
   * 当前展示日期
   * @default 今天
   */
  value?: string | number | Date;

  /**
   * 是否禁用今天以前的日期
   * @default false
   */
  disableTodayAgo?: boolean;

  /**
   * 是否高亮今天
   * @default true
   */
  highlightToday?: boolean;

  /**
   * 今天的显示文案
   */
  todayText?: string;

  /**
   * 一周的起始日期，默认星期日。可选值：0~6
   * @default 0
   */
  weekStart?: number;

  /**
   * 是否隐藏周栏
   * @default false
   */
  hideWeekBox?: boolean;

  /**
   * 是否隐藏头部栏
   * @default false
   */
  hideHeader?: boolean;

  /**
   * 格式化头部栏年份
   * @default yyyy年
   */
  formatHeaderYear?: string;

  /**
   * 格式化头部栏月份
   * @default M月
   */
  formatHeaderMonth?: string;

  /**
   * 自定义禁用日期的函数，返回true则表示该天禁用
   */
  disabledDate?: (date: Date) => boolean;

  /**
   * 自定义格式化日期的函数
   */
  dateFormatter?: (date: Date) => string;

  /**
   * 自定义格式化周的函数
   */
  weekFormatter?: (value: number) => string;

  /**
   * 选择日期之后的回调函数
   */
  onChange?: (date: Date) => void;
}

interface CalendarHeaderProps {
  year: number;
  month: number;
  visible: boolean;
  formatYear?: string;
  formatMonth?: string;
  onPreviousYear: () => void;
  onPreviousMonth: () => void;
  onNextYear: () => void;
  onNextMonth: () => void;
}

interface CalendarWeekBoxProps {
  start: number;
  visible: boolean;
  formatter?: (value: number) => string;
}

interface CalendarBodyProps extends CalendarProps {
  value: Date;
  datesByWeek: Date[][];
  currentMonth: number;
  currentYear: number;
  onSelect: (date: Date) => void;
}

const defaultProps: Partial<CalendarProps> = {
  value: new Date(),
  disableTodayAgo: false,
  highlightToday: true,
  weekStart: 0,
  hideWeekBox: false,
  hideHeader: false,
  formatHeaderYear: 'yyyy年',
  formatHeaderMonth: 'M月',
};

function Calendar(props: CalendarProps) {
  const { defaultValue, value = new Date(), weekStart = 0 } = props;

  const propsDate = getSafeDate(defaultValue || value);
  const propsYear = propsDate.getFullYear();
  const propsMonth = propsDate.getMonth();

  const internallyRef = React.useRef(false);
  const [selectedDate, setSelectedDate] = useChanges(
    propsDate,
    internallyRef.current,
    isEqualDate
  );
  const [currentYear, setCurrentYear] = React.useState(propsYear);
  const [currentMonth, setCurrentMonth] = React.useState(propsMonth);

  internallyRef.current = false;

  const displayDates = getDatesByWeek(currentYear, currentMonth, weekStart);

  const handlePreviousYear = () => {
    const newYear = currentYear - 1;
    if (newYear > 0) setCurrentYear(newYear);
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1;
    setCurrentYear(newYear);
  };

  const handlePreviousMonth = () => {
    const newMonth = currentMonth - 1;
    if (newMonth >= 0) {
      setCurrentMonth(newMonth);
    } else {
      const newYear = currentYear - 1;
      setCurrentYear(newYear);
      setCurrentMonth(11);
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth + 1;
    if (newMonth <= 11) {
      setCurrentMonth(newMonth);
    } else {
      const newYear = currentYear + 1;
      setCurrentYear(newYear);
      setCurrentMonth(0);
    }
  };

  const handleSelectDate = (date: Date) => {
    if (!isEqualDate(date, selectedDate)) {
      internallyRef.current = true;
      setSelectedDate(date);
      if (!isCurrentMonth(date, currentMonth)) {
        setCurrentMonth(date.getMonth());
      }
      if (!isCurrentYear(date, currentYear)) {
        setCurrentYear(date.getFullYear());
      }
      props.onChange && props.onChange(date);
    }
  };

  const prefix = getPrefix();
  const cls = component.getComponentClasses('calendar', props);

  return (
    <div className={cls} style={props.style}>
      <Header
        year={currentYear}
        month={currentMonth}
        visible={!props.hideHeader}
        formatYear={props.formatHeaderYear}
        formatMonth={props.formatHeaderMonth}
        onPreviousYear={handlePreviousYear}
        onPreviousMonth={handlePreviousMonth}
        onNextYear={handleNextYear}
        onNextMonth={handleNextMonth}
      />
      <div className={prefix + '-body'}>
        <table cellSpacing={0} cellPadding={0}>
          <WeekBox
            start={weekStart}
            visible={!props.hideWeekBox}
            formatter={props.weekFormatter}
          />
          <CalendarBody
            {...props}
            value={selectedDate}
            datesByWeek={displayDates}
            currentMonth={currentMonth}
            currentYear={currentYear}
            onSelect={handleSelectDate}
          />
        </table>
      </div>
    </div>
  );
}

function Header(props: CalendarHeaderProps) {
  if (!props.visible) return null;
  const date = new Date(props.year, props.month);
  return (
    <header className={getPrefix() + '-header'}>
      <Button onClick={props.onPreviousYear}>&lt;&lt;</Button>
      <Button onClick={props.onPreviousMonth}>&lt;</Button>
      <span className="year">{dateFormatter(props.formatYear, date)}</span>
      <span className="month">{dateFormatter(props.formatMonth, date)}</span>
      <Button onClick={props.onNextMonth}>&gt;</Button>
      <Button onClick={props.onNextYear}>&gt;&gt;</Button>
    </header>
  );
}

function WeekBox(props: CalendarWeekBoxProps) {
  const { start, visible, formatter = defaultWeekFormatter } = props;
  if (!visible) return null;
  const week = [];
  for (let i = start; i < start + 7; i++) {
    week.push(i < 7 ? i : i - 7);
  }
  return (
    <thead>
      <tr>
        {week.map(v => (
          <th key={v}>{formatter(v)}</th>
        ))}
      </tr>
    </thead>
  );
}

function CalendarBody(props: CalendarBodyProps) {
  const {
    value,
    datesByWeek,
    currentMonth,
    dateFormatter = defaultDateFormatter,
    todayText,
    highlightToday,
    disableTodayAgo,
    disabledDate,
    onSelect,
  } = props;
  const prefix = getPrefix();
  const today = new Date();

  return (
    <tbody>
      {datesByWeek.map((dates, index) => {
        return (
          <tr key={index}>
            {dates.map(date => {
              const isToday = isEqualDate(date, today);
              const handleClick = () => onSelect(date);
              return (
                <td key={date.getTime()}>
                  <span
                    className={cx(prefix + '-day', {
                      today: isToday && highlightToday,
                      selected: isEqualDate(date, value),
                      disabled: isDisabledDate(
                        date,
                        today,
                        disableTodayAgo,
                        disabledDate
                      ),
                      'prev-month': isPreviousMonth(date, currentMonth),
                      'next-month': isNextMonth(date, currentMonth),
                    })}
                    onClick={handleClick}>
                    {(isToday && todayText) || dateFormatter(date)}
                  </span>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

function getPrefix() {
  return component.getComponentPrefix('calendar');
}

function getSafeDate(d: Date | string | number) {
  if (typeof d === 'number') return new Date(d);
  if (typeof d === 'string') return new Date(d.replace(/-/g, '/'));
  return d;
}

function getPureDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDatesByWeek(year: number, month: number, weekStart: number) {
  const datesByWeek: Date[][] = [];
  const firstDate = getFirstDateOfMonth(year, month);
  const lastDate = getLastDateOfMonth(year, month);
  const firstDayOfWeek = firstDate.getDay();
  const lastDayOfWeek = lastDate.getDay();

  let start = 0;
  let end = lastDate.getDate();
  const startDelta = firstDayOfWeek - weekStart;
  const endDelta =
    lastDayOfWeek >= weekStart
      ? lastDayOfWeek - weekStart
      : 7 - lastDayOfWeek - weekStart;

  if (startDelta > 0) start -= startDelta;
  if (endDelta < 6) end += 6 - endDelta;

  for (let i = start; i < end; i++) {
    const week = Math.floor((i + startDelta) / 7);
    let dates = datesByWeek[week];
    if (!dates) dates = datesByWeek[week] = [];
    const date = new Date(year, month, i + 1);
    dates.push(date);
  }

  return datesByWeek;
}

function getFirstDateOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function getLastDateOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0);
}

function isEqualDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function lessThanDate(date1: Date, date2: Date) {
  const d1 = getPureDate(date1);
  const d2 = getPureDate(date2);
  return d1.getTime() < d2.getTime();
}

function isDisabledDate(
  date: Date,
  today: Date,
  disableTodayAgo?: boolean,
  disabledDate?: (date: Date) => boolean
) {
  if (disabledDate && disabledDate(date)) return true;
  if (disableTodayAgo && lessThanDate(date, today)) return true;
  return false;
}

function isPreviousMonth(date: Date, month: number) {
  return date.getMonth() < month;
}

function isNextMonth(date: Date, month: number) {
  return date.getMonth() > month;
}

function isCurrentMonth(date: Date, month: number) {
  return date.getMonth() === month;
}

function isCurrentYear(date: Date, year: number) {
  return date.getFullYear() === year;
}

function defaultWeekFormatter(value: number) {
  const localWeek = '日一二三四五六'.split('');
  return localWeek[value];
}

function defaultDateFormatter(date: Date) {
  return '' + date.getDate();
}

Calendar.defaultProps = defaultProps;

export default Calendar;
