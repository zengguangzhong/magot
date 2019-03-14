/// <reference path="../../../lib.d.ts" />
import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import CalendarWeek from './CalendarWeek';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';
import DecadeCalendar from './DecadeCalendar';
import RangeCalendar from './RangeCalendar';
import { getPrefix } from './prefix';
import { useChanges } from '../../hooks/changes';
import * as component from '../component';
import * as dateUtil from '../../utils/date';

import './Calendar.less';

export interface CalendarBaseProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 是否隐藏头部栏
   * @default false
   */
  hideHeader?: boolean;

  /**
   * 是否隐藏头部栏的快速大范围前切按钮
   * @default false
   */
  hideHeaderPreviousRange?: boolean;

  /**
   * 是否隐藏头部栏的快速大范围后切按钮
   * @default false
   */
  hideHeaderPrevious?: boolean;

  /**
   * 是否隐藏头部栏的快速前切按钮
   * @default false
   */
  hideHeaderNextRange?: boolean;

  /**
   * 是否隐藏头部栏的快速后切按钮
   * @default false
   */
  hideHeaderNext?: boolean;

  /**
   * 头部栏点击事件的回调函数
   */
  onHeaderClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * 页脚点击事件的回调函数
   */
  onFooterClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface CalendarProps extends CalendarBaseProps {
  /**
   * 当前选中日期
   */
  value?: AcceptableDate | null;

  /**
   * 当前展示的日期
   */
  currentDate?: AcceptableDate | null;

  /**
   * 是否禁用今天以前的日期
   * @default false
   */
  disableTodayAgo?: boolean;

  /**
   * 是否高亮激活今天(当未选中日期时)
   * @default true
   */
  activeToday?: boolean;

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
   * 是否隐藏头部栏的年份
   * @default false
   */
  hideHeaderYear?: boolean;

  /**
   * 是否隐藏头部栏的月份
   * @default false
   */
  hideHeaderMonth?: boolean;

  /**
   * 是否显示周号
   * @default false
   */
  showWeekNumber?: boolean;

  /**
   * 自定义禁用日期的函数，返回true则表示该天禁用(置灰)
   */
  disabledDate?: (date: Date) => boolean;

  /**
   * 自定义高亮激活日期的函数，返回true则表示高亮激活该天。
   * 默认只有当前选中的日期才是高亮激活的显示状态。
   */
  activedDate?: (date: Date, selected: Date | null) => boolean;

  /**
   * 自定义背景高亮强调日期的函数，返回true则表示强调该天(背景染色)
   */
  dyedDate?: (date: Date, selected: Date | null) => boolean;

  /**
   * 自定义日期格式化函数
   */
  dateFormatter?: (date: Date) => string;

  /**
   * 自定义周格式化函数
   */
  weekFormatter?: (value: number) => string;

  /**
   * 自定义月份格式化函数
   */
  monthFormatter?: (month: number) => string;

  /**
   * 自定义年份格式化函数
   */
  yearFormatter?: (year: number) => string;

  /**
   * 自定义头部栏年份格式化函数
   */
  headerYearFormatter?: (year: number) => string;

  /**
   * 自定义头部栏月份格式化函数
   */
  headerMonthFormatter?: (month: number) => string;

  /**
   * 选中日期发生变化之后的回调函数
   */
  onChange?: (value: Date, weekNumber?: number) => void;

  /**
   * 当前展示日期发生变化之后的回调函数
   */
  onCurrentDateChange?: (date: Date) => void;

  /**
   * 选择日期后的回调函数。
   * 不同于`onChange`，当在重复点击已选中日期时，也会触发该回调函数
   */
  onSelect?: (date: Date, weekNumber?: number) => void;
}

interface CalendarHeaderProps extends CalendarProps {
  currentYear: number;
  currentMonth: number;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
}

interface CalendarBodyProps extends CalendarProps {
  value: Date | null;
  currentYear: number;
  currentMonth: number;
  onSelect: (date: Date) => void;
}

interface InternallyRef {
  selected?: Date;
  current?: Date;
}

const defaultProps: Partial<CalendarProps> = {
  disableTodayAgo: false,
  activeToday: true,
  hideWeekBox: false,
  hideHeader: false,
  hideHeaderYear: false,
  hideHeaderMonth: false,
  hideHeaderPreviousRange: false,
  hideHeaderPrevious: false,
  hideHeaderNextRange: false,
  hideHeaderNext: false,
  showWeekNumber: false,
  weekStart: 0,
};

function Calendar(props: CalendarProps) {
  const today = new Date();
  const valueProp = props.value;
  const dateProp = valueProp ? dateUtil.getSafeDate(valueProp) : null;
  const currentProp = props.currentDate
    ? dateUtil.getSafeDate(props.currentDate)
    : dateProp || today;

  const internallyRef = React.useRef<InternallyRef | null>(null);

  let isInternally = false;
  if (internallyRef.current) {
    isInternally =
      !!internallyRef.current.selected || !!internallyRef.current.current;
  }

  const [selectedDate, setSelectedDate] = useChanges(
    dateProp,
    isInternally,
    dateUtil.equalDate
  );

  const [currentDate, setCurrentDate] = useChanges(
    currentProp,
    isInternally,
    (a, b) => dateUtil.equalDate(a, b, true)
  );
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (internallyRef.current) {
    const ref = internallyRef.current;
    if (ref.selected !== void 0) {
      props.onChange && props.onChange(ref.selected);
    }
    if (ref.current !== void 0) {
      props.onCurrentDateChange && props.onCurrentDateChange(ref.current);
    }
    internallyRef.current = null;
  }

  const handleYearChange = (year: number) => {
    const current = new Date(year, currentMonth);
    internallyRef.current = { current };
    setCurrentDate(current);
  };

  const handleMonthChange = (month: number) => {
    const current = new Date(currentYear, month);
    if (month < 0) {
      current.setFullYear(currentYear - 1);
      current.setMonth(11);
      setCurrentDate(current);
    } else if (month > 11) {
      current.setFullYear(currentYear + 1);
      current.setMonth(0);
      setCurrentDate(current);
    } else {
      setCurrentDate(current);
    }
    internallyRef.current = { current };
  };

  const handleSelectDate = (date: Date) => {
    if (!dateUtil.equalDate(date, selectedDate)) {
      const ref: InternallyRef = { selected: date };
      setSelectedDate(date);
      const y = dateUtil.isCurrentYear(date, currentYear);
      const m = dateUtil.isCurrentMonth(date, currentMonth);
      if (!y || !m) {
        ref.current = date;
        setCurrentDate(date);
      }
      internallyRef.current = ref;
    }
    props.onSelect && props.onSelect(date);
  };

  const cls = component.getComponentClasses('calendar', props);

  return (
    <div className={cls} style={props.style}>
      <DateCalendarHeader
        {...props}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
      />
      <DateCalendarBody
        {...props}
        value={selectedDate}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onSelect={handleSelectDate}
      />
      {props.children && (
        <CalendarFooter onClick={props.onFooterClick}>
          {props.children}
        </CalendarFooter>
      )}
    </div>
  );
}

Calendar.defaultProps = defaultProps;

Calendar.Week = WeekCalendar;
Calendar.Month = MonthCalendar;
Calendar.Year = YearCalendar;
Calendar.Decade = DecadeCalendar;
Calendar.Range = RangeCalendar;

function DateCalendarHeader(props: CalendarHeaderProps) {
  const {
    currentYear,
    currentMonth,
    headerYearFormatter = defaultHeaderYearFormatter,
    headerMonthFormatter = defaultHeaderMonthFormatter,
    onYearChange,
    onMonthChange,
  } = props;

  const [yearSelectorVisible, setYearSelectorVisible] = React.useState(false);
  const [monthSelectorVisible, setMonthSelectorVisible] = React.useState(false);

  const handlePreviousYear = () => {
    onYearChange && onYearChange(currentYear - 1);
  };
  const handleNextYear = () => {
    onYearChange && onYearChange(currentYear + 1);
  };
  const handlePreviousMonth = () => {
    onMonthChange && onMonthChange(currentMonth - 1);
  };
  const handleNextMonth = () => {
    onMonthChange && onMonthChange(currentMonth + 1);
  };

  const handleYearClick = () => {
    if (!yearSelectorVisible) setYearSelectorVisible(true);
  };

  const handleMonthClick = () => {
    if (!monthSelectorVisible) setMonthSelectorVisible(true);
  };

  const handleYearSelect = (year: number) => {
    if (year !== currentYear) {
      props.onYearChange && props.onYearChange(year);
    }
    setYearSelectorVisible(false);
  };

  const handleMonthSelect = (value: YearMonth) => {
    if (value.year !== currentYear) {
      props.onYearChange && props.onYearChange(value.year);
    }
    if (value.month !== currentMonth) {
      props.onMonthChange && props.onMonthChange(value.month);
    }
    setMonthSelectorVisible(false);
  };

  const prefix = getPrefix();

  const title = (
    <>
      {!props.hideHeaderYear && (
        <a href="javascript:;" onClick={handleYearClick}>
          {headerYearFormatter(currentYear)}
        </a>
      )}
      {!props.hideHeaderMonth && (
        <a href="javascript:;" onClick={handleMonthClick}>
          {headerMonthFormatter(currentMonth)}
        </a>
      )}
    </>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      previousVisible={!props.hideHeaderPrevious}
      nextRangeVisible={!props.hideHeaderNextRange}
      nextVisible={!props.hideHeaderNext}
      onPreviousRange={handlePreviousYear}
      onNextRange={handleNextYear}
      onPrevious={handlePreviousMonth}
      onNext={handleNextMonth}
      onClick={props.onHeaderClick}>
      {yearSelectorVisible && (
        <YearCalendar
          className={prefix + '-selector'}
          value={currentYear}
          yearFormatter={props.yearFormatter}
          onSelect={handleYearSelect}
        />
      )}
      {monthSelectorVisible && (
        <MonthCalendar
          className={prefix + '-selector'}
          value={{ year: currentYear, month: currentMonth }}
          yearFormatter={props.yearFormatter}
          monthFormatter={props.monthFormatter}
          headerYearFormatter={props.headerYearFormatter}
          onSelect={handleMonthSelect}
        />
      )}
    </CalendarHeader>
  );
}

function DateCalendarBody(props: CalendarBodyProps) {
  const { currentYear, currentMonth, weekStart = 0 } = props;
  const datesByWeek = getDatesByWeek(currentYear, currentMonth, weekStart);
  const today = new Date();
  return (
    <CalendarBody>
      <CalendarWeek
        start={props.weekStart || 0}
        visible={!props.hideWeekBox}
        showWeekNumber={!!props.showWeekNumber}
        formatter={props.weekFormatter}
      />
      <CalendarGrid>
        {datesByWeek.map((dates, index) => {
          return (
            <DateCalendarRow
              {...props}
              dates={dates}
              today={today}
              key={index}
            />
          );
        })}
      </CalendarGrid>
    </CalendarBody>
  );
}

function DateCalendarRow(
  props: CalendarBodyProps & { dates: Date[]; today: Date }
) {
  const { dates } = props;
  const wednesday = dates.find(d => d.getDay() === 3);
  return (
    <CalendarRow>
      {props.showWeekNumber && (
        <CalendarCell className="week-number">
          {dateUtil.getWeekNumber(wednesday || dates[0])}
        </CalendarCell>
      )}
      {dates.map(date => {
        return <DateCalendarCell {...props} date={date} key={date.getTime()} />;
      })}
    </CalendarRow>
  );
}

function DateCalendarCell(
  props: CalendarBodyProps & { date: Date; today: Date }
) {
  const { date, dateFormatter = defaultDateFormatter } = props;
  const isToday = dateUtil.equalDate(date, props.today);

  let selected = dateUtil.equalDate(date, props.value);
  if (!props.value && props.activeToday) selected = isToday;
  if (!selected && props.activedDate) {
    selected = props.activedDate(date, props.value);
  }

  let dyed = false;
  if (props.dyedDate) {
    dyed = props.dyedDate(date, props.value);
  }

  const disabled = isDisabledDate(
    date,
    props.today,
    props.disableTodayAgo,
    props.disabledDate
  );

  const handleClick = () => props.onSelect(date);

  return (
    <CalendarCell
      dyed={dyed}
      current={isToday}
      selected={selected}
      disabled={disabled}
      outside={
        dateUtil.isPreviousMonth(date, props.currentMonth) ||
        dateUtil.isNextMonth(date, props.currentMonth)
      }
      onClick={handleClick}>
      <CalendarCellNode
        className={props.showWeekNumber ? 'week-date' : undefined}>
        {(isToday && props.todayText) || dateFormatter(date)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getDatesByWeek(year: number, month: number, weekStart: number) {
  const datesByWeek: Date[][] = [];
  const firstDayOfMonth = dateUtil.getFirstDayOfMonth(year, month);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  let start = 0;
  const startDelta = firstDayOfWeek - weekStart;
  if (startDelta > 0) start -= startDelta;

  // grid: 6 * 7
  for (let i = start; i < 42 + start; i++) {
    const week = Math.floor((i + startDelta) / 7);
    let dates = datesByWeek[week];
    if (!dates) dates = datesByWeek[week] = [];
    const date = new Date(year, month, i + 1);
    dates.push(date);
  }

  return datesByWeek;
}

function isDisabledDate(
  date: Date,
  today: Date,
  disableTodayAgo?: boolean,
  disabledDate?: (date: Date) => boolean
) {
  if (disabledDate && disabledDate(date)) return true;
  if (disableTodayAgo && dateUtil.lessThanDate(date, today)) return true;
  return false;
}

function defaultDateFormatter(date: Date) {
  return '' + date.getDate();
}

function defaultHeaderYearFormatter(year: number) {
  return year + '年';
}

function defaultHeaderMonthFormatter(month: number) {
  return month + 1 + '月';
}

export default Calendar;
