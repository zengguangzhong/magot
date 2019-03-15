import React from 'react';
import { DatePickerProps, getDefaultProps } from './DatePicker';
import PickerPopup from './PickerPopup';
import PickerTrigger from './PickerTrigger';
import PickerCalendarWrapper from './PickerCalendar';
import WeekCalendar from '../Calendar/WeekCalendar';
import { useChanges } from '../../hooks/changes';
import DateUtil from '../../utils/date';

export interface WeekPickerProps extends DatePickerProps {}

const defaultProps: Partial<WeekPickerProps> = {
  ...getDefaultProps(),
  format: 'yyyy 第 w 周',
};

const PickerCalendar = PickerCalendarWrapper(WeekCalendar);

function WeekPicker(props: WeekPickerProps) {
  const {
    defaultValue,
    value,
    format,
    calendarProps,
    children,
    inputValueFormatter = DateUtil.format,
    onChange,
    onClear,
    ...formProps
  } = props;

  const valueProp = defaultValue || value;
  const dateProp = valueProp ? DateUtil(valueProp).to() : null;

  const internallyRef = React.useRef(false);

  const [currentDate, setCurrentDate] = useChanges<Date | null>(
    dateProp,
    internallyRef.current,
    DateUtil.eq
  );

  internallyRef.current = false;

  const updateCurrentDate = (date: Date | null) => {
    if (!DateUtil.eq(date, currentDate)) {
      internallyRef.current = true;
      setCurrentDate(date);
      const dateString = (date && DateUtil(date).format(format)) || '';
      onChange && onChange(date, dateString);
    }
  };

  const handleClear = () => {
    updateCurrentDate(null);
    onClear && onClear();
  };

  const overlay = (
    <PickerCalendar
      {...calendarProps}
      value={currentDate}
      onChange={updateCurrentDate}>
      {children}
    </PickerCalendar>
  );

  let displayValue = '';
  if (currentDate) {
    displayValue = inputValueFormatter(currentDate, format);
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

WeekPicker.defaultProps = defaultProps;

export default WeekPicker;
