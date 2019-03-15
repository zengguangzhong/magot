/// <reference path="../../../lib.d.ts" />
import React from 'react';
import Calendar, { CalendarProps } from '../Calendar';
import PickerPopup from './PickerPopup';
import PickerTrigger from './PickerTrigger';
import PickerCalendarWrapper from './PickerCalendar';
import MonthPicker from './MonthPicker';
import WeekPicker from './WeekPicker';
import RangePicker from './RangePicker';
import { InputFormComponent, NestedComponent } from '../component';
import { useChanges } from '../../hooks/changes';
import * as dateUtil from '../../utils/date';

import './DatePicker.less';

export interface DatePickerProps
  extends InputFormComponent<HTMLInputElement, AcceptableDate | null>,
    NestedComponent {
  /**
   * 设置日期格式
   * @default yyyy-MM-dd
   */
  format?: string;

  /**
   * 指定选择器宽度
   * @default 160
   */
  width?: number;

  /**
   * 传递日历属性
   */
  calendarProps?: CalendarProps;

  /**
   * 自定义输入框内容的格式化函数，默认根据`format`属性格式化
   */
  inputValueFormatter?: (date: Date, format?: string) => string;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (date: Date | null, dateString?: string) => void;
}

export type DatePickerNormalProps = Pick<
  DatePickerProps,
  Exclude<
    keyof DatePickerProps,
    | 'defaultValue'
    | 'value'
    | 'calendarProps'
    | 'inputValueFormatter'
    | 'onChange'
  >
>;

export function getDefaultProps() {
  const props: Partial<DatePickerProps> = {
    width: 160,
    clearable: true,
    format: 'yyyy-MM-dd',
  };
  return props;
}

const defaultProps = getDefaultProps();

const PickerCalendar = PickerCalendarWrapper(Calendar);

function DatePicker(props: DatePickerProps) {
  const {
    defaultValue,
    value,
    format,
    calendarProps,
    children,
    inputValueFormatter = dateUtil.format,
    onChange,
    ...formProps
  } = props;

  const valueProp = defaultValue || value;
  const dateProp = valueProp ? dateUtil.getSafeDate(valueProp) : null;

  const internallyRef = React.useRef(false);

  const [currentDate, setCurrentDate] = useChanges<Date | null>(
    dateProp,
    internallyRef.current,
    dateUtil.equalDate
  );
  const [inputValue, setInputValue] = React.useState<string | null>(null);

  internallyRef.current = false;

  const updateCurrentDate = (date: Date | null, input?: string | null) => {
    if (input !== inputValue) {
      internallyRef.current = true;
      setInputValue(input || null);
    }
    if (!dateUtil.equalDate(date, currentDate)) {
      internallyRef.current = true;
      setCurrentDate(date);
      const dateString = (date && dateUtil.format(date, format)) || '';
      onChange && onChange(date, dateString);
    }
  };

  const handleInputChange = (value: string | null, completed?: boolean) => {
    let date: Date | null = value ? dateUtil.getSafeDate(value) : null;
    if (date && isNaN(date.getDate())) date = currentDate;
    updateCurrentDate(date, !completed ? value : null);
  };

  const handleCalendarChange = (date: Date) => {
    updateCurrentDate(date, null);
  };

  let displayValue = '';
  if (currentDate) {
    displayValue = inputValueFormatter(currentDate, format);
  }
  if (inputValue !== null) displayValue = inputValue;

  const overlay = (
    <PickerCalendar
      {...calendarProps}
      value={currentDate}
      onChange={handleCalendarChange}>
      {children}
    </PickerCalendar>
  );

  return (
    <PickerPopup overlay={overlay}>
      <PickerTrigger
        {...formProps}
        value={displayValue}
        onUpdate={handleInputChange}
      />
    </PickerPopup>
  );
}

DatePicker.defaultProps = defaultProps;

DatePicker.MonthPicker = MonthPicker;
DatePicker.WeekPicker = WeekPicker;
DatePicker.RangePicker = RangePicker;

export default DatePicker;
