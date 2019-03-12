import React from 'react';

import Button from '../Button';
import { getPrefix } from './prefix';
import { NestedComponent } from '../component';

export interface CalendarHeaderProps extends NestedComponent {
  visible?: boolean;
  title?: React.ReactNode;
  previousVisible?: boolean;
  nextVisible?: boolean;
  previousRangeVisible?: boolean;
  nextRangeVisible?: boolean;
  onPrevious?: (e: React.MouseEvent<HTMLElement>) => void;
  onNext?: (e: React.MouseEvent<HTMLElement>) => void;
  onPreviousRange?: (e: React.MouseEvent<HTMLElement>) => void;
  onNextRange?: (e: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const defaultProps: Partial<CalendarHeaderProps> = {
  visible: true,
  previousVisible: true,
  nextVisible: true,
  previousRangeVisible: true,
  nextRangeVisible: true,
};

function CalendarHeader(props: CalendarHeaderProps) {
  if (!props.visible) return null;
  const prefix = getPrefix();
  return (
    <header className={prefix + '-header'} onClick={props.onClick}>
      {props.previousRangeVisible && (
        <Button className="prev-range" onClick={props.onPreviousRange}>
          &lt;&lt;
        </Button>
      )}
      {props.previousVisible && (
        <Button className="prev" onClick={props.onPrevious}>
          &lt;
        </Button>
      )}
      <div className={prefix + '-title'}>{props.title}</div>
      {props.nextVisible && (
        <Button className="next" onClick={props.onNext}>
          &gt;
        </Button>
      )}
      {props.nextRangeVisible && (
        <Button className="next-range" onClick={props.onNextRange}>
          &gt;&gt;
        </Button>
      )}
      {props.children}
    </header>
  );
}

CalendarHeader.defaultProps = defaultProps;

export default CalendarHeader;
