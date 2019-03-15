/// <reference path="../../../lib.d.ts" />
import React from 'react';
import { DatePickerNormalProps } from './DatePicker';
import PickerPopup from './PickerPopup';
import PickerTrigger from './PickerTrigger';
import PickerCalendarWrapper from './PickerCalendar';
import RangeCalendar, { RangeCalendarProps } from '../Calendar/RangeCalendar';
import { useChanges } from '../../hooks/changes';
import * as dateUtil from '../../utils/date';

export interface RangePickerProps extends DatePickerNormalProps {
  /**
   * 默认日期范围
   */
  defaultValue?: Array<AcceptableDate> | null;

  /**
   * 当前选中的日期范围
   */
  value?: Array<AcceptableDate> | null;

  /**
   * 自定义分隔符，默认是`~`
   * @default ~
   */
  separator?: string;

  /**
   * 传递日历属性
   */
  calendarProps?: RangeCalendarProps;

  /**
   * 自定义输入框内容的格式化函数，默认是用`~`符号串联日期范围
   */
  inputValueFormatter?: (
    dates: Date[],
    format?: string,
    separator?: string
  ) => string;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (dates: Date[] | null, datesString?: string[]) => void;
}

const defaultProps: Partial<RangePickerProps> = {
  width: 280,
  clearable: true,
  format: 'yyyy-MM-dd',
  separator: '~',
};

const PickerCalendar = PickerCalendarWrapper(RangeCalendar);

function RangePicker(props: RangePickerProps) {
  const {
    defaultValue,
    value,
    format,
    separator,
    calendarProps,
    children,
    inputValueFormatter = defaultInputValueFormatter,
    onChange,
    onClear,
    ...formProps
  } = props;

  const valueProp = (defaultValue || value || []).slice(0, 2);
  const datesProp = valueProp.map(dateUtil.getSafeDate).sort(dateUtil.sortDate);

  const internallyRef = React.useRef(false);

  const [currentDates, setCurrentDates] = useChanges(
    datesProp,
    internallyRef.current,
    equal
  );

  internallyRef.current = false;

  const updateCurrentDates = (dates: Date[]) => {
    if (!equal(dates, currentDates)) {
      internallyRef.current = true;
      setCurrentDates(dates);
      onChange && onChange(dates, formatDates(dates, format));
    }
  };

  const handleClear = () => {
    updateCurrentDates([]);
    onClear && onClear();
  };

  const overlay = (
    <PickerCalendar
      {...calendarProps}
      value={currentDates}
      onChange={updateCurrentDates}>
      {children}
    </PickerCalendar>
  );

  let displayValue = '';
  if (currentDates) {
    displayValue = inputValueFormatter(currentDates, format, separator);
  }

  return (
    <PickerPopup overlay={overlay}>
      <PickerTrigger
        {...formProps}
        readOnly={true}
        value={displayValue}
        onClear={handleClear}
      />
    </PickerPopup>
  );
}

RangePicker.defaultProps = defaultProps;

function defaultInputValueFormatter(
  dates: Date[],
  format?: string,
  separator?: string
) {
  return formatDates(dates, format).join(separator);
}

function formatDates(dates: Date[] | null, format?: string) {
  return (dates || []).map(date => {
    return dateUtil.format(date, format);
  });
}

function equal(a: Date[], b: Date[]) {
  return dateUtil.equalDate(a[0], b[0]) && dateUtil.equalDate(a[1], b[1]);
}

export default RangePicker;
