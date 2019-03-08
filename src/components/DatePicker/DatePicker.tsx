import React from 'react';
import cx from 'classnames';

import Input from '../Input';
import Popup from '../Popup';
import Calendar, { CalendarProps } from '../Calendar';
import * as component from '../component';
import * as dateUtil from '../../utils/date';
import { useChanges } from '../../hooks/changes';

import './DatePicker.less';

export interface DatePickerProps
  extends component.InputFormComponent<
      HTMLInputElement,
      string | number | Date | null
    >,
    component.NestedComponent {
  /**
   * 设置日期格式
   * @default yyyy-MM-dd
   */
  format?: string;

  /**
   * 指定选择器宽度
   * @default 140
   */
  width?: number;

  /**
   * 传递日历属性
   */
  calendarProps?: CalendarProps;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (date: Date | null, dateString: string) => void;
}

const defaultProps: Partial<DatePickerProps> = {
  clearable: true,
  format: 'yyyy-MM-dd',
  width: 140,
};

function DatePicker(props: DatePickerProps) {
  const {
    className,
    style,
    width,
    defaultValue,
    value,
    format,
    calendarProps,
    children,
    onChange,
    onPressEnter,
    onBlur,
    onClear,
    ...formProps
  } = props;

  const valueProp = defaultValue || value;
  const dateProp = valueProp ? dateUtil.getSafeDate(valueProp) : null;

  const internallyRef = React.useRef(false);
  const [currentDate, setCurrentDate] = useChanges<Date | null>(
    dateProp,
    internallyRef.current,
    dateUtil.isEqualDate
  );
  const [inputValue, setInputValue] = React.useState<string | null>(null);

  internallyRef.current = false;

  const updateCurrentDate = (date: Date | null, inputValue?: string | null) => {
    setInputValue(inputValue || null);
    if (!currentDate || !dateUtil.isEqualDate(date, currentDate)) {
      internallyRef.current = true;
      setCurrentDate(date);
      const dateString = (date && dateUtil.formatter(format, date)) || '';
      onChange && onChange(date, dateString);
    }
  };

  const updateByInputValue = (inputValue: string, completed: boolean) => {
    let date: Date | null = dateUtil.getSafeDate(inputValue);
    if (isNaN(date.getDate())) date = currentDate;
    updateCurrentDate(date, !completed ? inputValue : null);
  };

  const handleCalendarChange = (date: Date) => {
    updateCurrentDate(date, null);
    calendarProps && calendarProps.onChange && calendarProps.onChange(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateByInputValue(e.target.value, false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    updateByInputValue(e.target.value, true);
    onBlur && onBlur(e);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.click();
    updateByInputValue(input.value, true);
    onPressEnter && onPressEnter(e);
  };

  const handleClear = () => {
    updateCurrentDate(null);
    onClear && onClear();
  };

  const handleHeaderClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    calendarProps &&
      calendarProps.onHeaderClick &&
      calendarProps.onHeaderClick(e);
  };

  const type = 'date-picker';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, { className });

  let displayValue = '';
  if (currentDate) displayValue = dateUtil.formatter(format, currentDate);
  if (inputValue !== null) displayValue = inputValue;

  const trigger = (
    <Input
      {...formProps}
      className={cls}
      style={{ ...style, width }}
      icon="calendar"
      value={displayValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onPressEnter={handlePressEnter}
      onClear={handleClear}
    />
  );

  const overlay = (
    <Calendar
      {...calendarProps}
      className={cx(
        prefix + '-calendar',
        calendarProps && calendarProps.className
      )}
      value={currentDate}
      highlightToday={false}
      onChange={handleCalendarChange}
      onHeaderClick={handleHeaderClick}>
      {children}
    </Calendar>
  );

  return (
    <Popup
      className={prefix + '-popup'}
      placement="bottomLeft"
      trigger="click"
      space={2}
      removeWhenClose={true}
      overlay={overlay}>
      {trigger}
    </Popup>
  );
}

DatePicker.defaultProps = defaultProps;

export default DatePicker;
