import React, { ComponentType } from 'react';
import { CalendarNormalProps } from '../Calendar';
import { getComponentClasses } from '../component';

function Wrapper<P extends CalendarNormalProps>(Calendar: ComponentType<P>) {
  return function PickerCalendar(props: P) {
    const handleHeaderClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      props.onHeaderClick && props.onHeaderClick(e);
    };
    return (
      <Calendar
        {...props}
        className={getComponentClasses('date-picker-calendar', {
          className: props.className,
        })}
        activeToday={false}
        onHeaderClick={handleHeaderClick}>
        {props.children}
      </Calendar>
    );
  };
}

export default Wrapper;
