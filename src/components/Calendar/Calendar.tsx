/// <reference path="../../../lib.d.ts" />
import React from 'react';

import DateCalendar from './DateCalendar';
import WeekCalendar from './WeekCalendar';
import MonthCalendar from './MonthCalendar';
import YearCalendar from './YearCalendar';
import DecadeCalendar from './DecadeCalendar';
import * as component from '../component';

export interface CalendarProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 默认日期
   */
  defaultValue?: AcceptableDate | null;

  /**
   * 当前展示日期
   */
  value?: AcceptableDate | null;

  /**
   * 当前展示的年份
   */
  currentYear?: number;

  /**
   * 当前展示的月份
   */
  currentMonth?: number;

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
   * 是否隐藏头部栏
   * @default false
   */
  hideHeader?: boolean;

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

  hideHeaderPreviousRange?: boolean;
  hideHeaderPrevious?: boolean;
  hideHeaderNextRange?: boolean;
  hideHeaderNext?: boolean;

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
   * 选择日期之后的回调函数
   */
  onChange?: (date: Date, weekNumber?: number) => void;

  /**
   * 当切换年份之后的回调函数
   */
  onYearChange?: (year: number) => void;

  /**
   * 当切换月份之后的回调函数
   */
  onMonthChange?: (month: number) => void;

  /**
   * 头部栏点击事件的回调函数
   */
  onHeaderClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * 页脚点击事件的回调函数
   */
  onFooterClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface CalendarHeaderProps extends CalendarProps {
  currentMonth: number;
  currentYear: number;
}

export interface CalendarBodyProps extends CalendarProps {
  value: Date | null;
  currentMonth: number;
  currentYear: number;
  onSelect: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  return <DateCalendar {...props}>{props.children}</DateCalendar>;
}

Calendar.Date = DateCalendar;
Calendar.Week = WeekCalendar;
Calendar.Month = MonthCalendar;
Calendar.Year = YearCalendar;
Calendar.Decade = DecadeCalendar;

export default Calendar;
