import React from 'react';
import cx from 'classnames';
import { CalendarBaseProps } from './Calendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import { getPrefix } from './prefix';
import { useChanges } from '../../hooks/changes';
import * as dateUtil from '../../utils/date';
import * as component from '../component';

export interface DecadeCalendarProps extends CalendarBaseProps {
  /**
   * 当前选中年代
   */
  value?: number | null;

  /**
   * 当前展示的世纪
   */
  currentCentury?: number;

  /**
   * 选中年代发生变化之后的回调函数
   */
  onChange?: (value: number) => void;

  /**
   * 当前展示世纪发生变化之后的回调函数
   */
  onCurrentCenturyChange?: (century: number) => void;

  /**
   * 选择年代后的回调函数。
   * 不同于`onChange`，当在重复点击已选中年代时，也会触发该回调函数
   */
  onSelect?: (decade: number) => void;
}

interface DecadeCalendarHeaderProps extends DecadeCalendarProps {
  currentCentury: number;
  onCenturyChange?: (century: number) => void;
}

interface DecadeCalendarBodyProps extends DecadeCalendarProps {
  value: number;
  currentCentury: number;
  onSelect: (decade: number) => void;
}

interface InternallyRef {
  selected?: number;
  current?: number;
}

const defaultProps: Partial<DecadeCalendarProps> = {
  hideHeader: false,
  hideHeaderPreviousRange: false,
  hideHeaderNextRange: false,
};

function getDefaultDecade() {
  const today = new Date();
  return dateUtil.getDecade(today.getFullYear())[0];
}

function DecadeCalendar(props: DecadeCalendarProps) {
  const decadeProp = props.value || getDefaultDecade();
  const currentCenturyProp =
    props.currentCentury || dateUtil.getCentury(decadeProp)[0];

  const internallyRef = React.useRef<InternallyRef | null>(null);

  let isInternally = false;
  if (internallyRef.current) {
    isInternally =
      !!internallyRef.current.selected || !!internallyRef.current.current;
  }

  const [selectedDecade, setSelectedDecade] = useChanges(
    decadeProp,
    isInternally
  );

  const [currentCentury, setCurrentCentury] = useChanges(
    currentCenturyProp,
    isInternally
  );

  if (internallyRef.current) {
    const ref = internallyRef.current;
    if (ref.selected !== void 0) {
      props.onChange && props.onChange(ref.selected);
    }
    if (ref.current !== void 0) {
      props.onCurrentCenturyChange && props.onCurrentCenturyChange(ref.current);
    }
    internallyRef.current = null;
  }

  const handleCenturyChange = (century: number) => {
    if (century !== currentCentury) {
      internallyRef.current = { current: century };
      setCurrentCentury(century);
    }
  };

  const handleSelectDate = (decade: number) => {
    if (decade !== selectedDecade) {
      const ref: InternallyRef = { selected: decade };
      setSelectedDecade(decade);
      if (decade < currentCentury) {
        const century = currentCentury - 100;
        ref.current = century;
        setCurrentCentury(century);
      }
      if (decade > currentCentury + 99) {
        const century = currentCentury + 100;
        ref.current = century;
        setCurrentCentury(century);
      }
      internallyRef.current = ref;
    }
    props.onSelect && props.onSelect(decade);
  };

  const prefix = component.getComponentPrefix('calendar');
  const cls = component.getComponentClasses('decade-calendar', props);

  return (
    <div className={cx(prefix, cls)} style={props.style}>
      <DecadeCalendarHeader
        {...props}
        currentCentury={currentCentury}
        onCenturyChange={handleCenturyChange}
      />
      <DecadeCalendarBody
        {...props}
        value={selectedDecade}
        currentCentury={currentCentury}
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

DecadeCalendar.defaultProps = defaultProps;

function DecadeCalendarHeader(props: DecadeCalendarHeaderProps) {
  const { currentCentury, onCenturyChange } = props;

  const handlePreviousCentury = () => {
    onCenturyChange && onCenturyChange(currentCentury - 100);
  };
  const handleNextCentury = () => {
    onCenturyChange && onCenturyChange(currentCentury + 100);
  };

  const title = (
    <span>
      {currentCentury}-{currentCentury + 99}
    </span>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      nextRangeVisible={!props.hideHeaderNextRange}
      previousVisible={false}
      nextVisible={false}
      onPreviousRange={handlePreviousCentury}
      onNextRange={handleNextCentury}
      onClick={props.onHeaderClick}
    />
  );
}

function DecadeCalendarBody(props: DecadeCalendarBodyProps) {
  const decades = getDecadesByCentury(props.currentCentury);
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => {
          return (
            <CalendarRow key={row}>
              {[0, 1, 2].map(column => {
                const decade = decades[row * 3 + column];
                return (
                  <DecadeCalendarCell
                    {...props}
                    key={decade.join('-')}
                    decade={decade}
                    isFirst={decade === decades[0]}
                    isLast={decade === decades[decades.length - 1]}
                  />
                );
              })}
            </CalendarRow>
          );
        })}
      </CalendarGrid>
    </CalendarBody>
  );
}

function DecadeCalendarCell(
  props: DecadeCalendarBodyProps & {
    decade: number[];
    isFirst: boolean;
    isLast: boolean;
  }
) {
  const { decade, value } = props;
  const selected = value >= decade[0] && value <= decade[1];
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    props.onSelect(decade[0]);
    props.onCellClick && props.onCellClick(e);
  };
  const prefix = getPrefix();
  return (
    <CalendarCell
      selected={selected}
      outside={props.isFirst || props.isLast}
      onClick={handleClick}>
      <CalendarCellNode className={prefix + '-decade'}>
        {props.decade.join('-')}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getDecadesByCentury(year: number) {
  const decades: number[][] = [];
  const century = dateUtil.getCentury(year);
  for (let i = century[0] - 10; i <= century[1] + 10; i += 10) {
    const decade = dateUtil.getDecade(i);
    decades.push(decade);
  }
  return decades;
}

export default DecadeCalendar;
