/// <reference path="../../../lib.d.ts" />
import React from 'react';
import { getDefaultProps, DatePickerNormalProps } from './DatePicker';
import PickerPopup from './PickerPopup';
import PickerTrigger from './PickerTrigger';
import PickerCalendarWrapper from './PickerCalendar';
import MonthCalendar, { MonthCalendarProps } from '../Calendar/MonthCalendar';
import { useChanges } from '../../hooks/changes';
import * as dateUtil from '../../utils/date';

export interface MonthPickerProps extends DatePickerNormalProps {
  /**
   * 默认年月
   */
  defaultValue?: AcceptableDate | null;

  /**
   * 当前选中的年月
   */
  value?: AcceptableDate | null;

  /**
   * 传递日历属性
   */
  calendarProps?: MonthCalendarProps;

  /**
   * 自定义输入框内容的格式化函数，默认根据`format`属性格式化
   */
  inputValueFormatter?: (value: Date, format?: string) => string;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (value: Date | null, dateString?: string) => void;
}

const defaultProps: Partial<MonthPickerProps> = {
  ...getDefaultProps(),
  format: 'yyyy-MM',
};

const PickerCalendar = PickerCalendarWrapper(MonthCalendar);

function MonthPicker(props: MonthPickerProps) {
  const {
    defaultValue,
    value,
    format,
    calendarProps,
    children,
    inputValueFormatter = dateUtil.format,
    onChange,
    onClear,
    ...formProps
  } = props;

  const _value = defaultValue || value;
  const valueProp = _value ? dateUtil.getSafeDate(_value) : null;
  const dateProp = valueProp ? dateUtil.getPureDate(valueProp, true) : null;

  const internallyRef = React.useRef(false);

  const [currentValue, setCurrentValue] = useChanges(
    dateProp,
    internallyRef.current,
    (a, b) => dateUtil.equalDate(a, b, true)
  );

  internallyRef.current = false;

  const updateCurrentValue = (value: Date | null) => {
    if (!dateUtil.equalDate(value, currentValue, true)) {
      internallyRef.current = true;
      setCurrentValue(value);
      const dateString = (value && dateUtil.format(value, format)) || '';
      onChange && onChange(value, dateString);
    }
  };

  const handleClear = () => {
    updateCurrentValue(null);
    onClear && onClear();
  };

  const overlay = (
    <PickerCalendar
      {...calendarProps}
      value={currentValue}
      onChange={updateCurrentValue}>
      {children}
    </PickerCalendar>
  );

  let displayValue = '';
  if (currentValue) {
    displayValue = inputValueFormatter(currentValue, format);
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

MonthPicker.defaultProps = defaultProps;

export default MonthPicker;
