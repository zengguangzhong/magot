import React from 'react';
import cx from 'classnames';
import { CalendarBaseProps } from './Calendar';
import DecadeCalendar from './DecadeCalendar';
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

export interface YearCalendarProps extends CalendarBaseProps {
  /**
   * 当前选中年份
   */
  value?: number | null;

  /**
   * 当前展示的年代
   */
  currentDecade?: number | null;

  /**
   * 自定义年份格式化函数
   */
  yearFormatter?: (year: number) => string;

  /**
   * 选中年份发生变化之后的回调函数
   */
  onChange?: (value: number) => void;

  /**
   * 当前展示年代发生变化之后的回调函数
   */
  onCurrentDecadeChange?: (decade: number) => void;

  /**
   * 选择年份后的回调函数。
   * 不同于`onChange`，当在重复点击已选中年份时，也会触发该回调函数
   */
  onSelect?: (year: number) => void;
}

interface YearCalendarHeaderProps extends YearCalendarProps {
  currentDecade: number;
  onDecadeChange?: (decade: number) => void;
}

interface YearCalendarBodyProps extends YearCalendarProps {
  value: number | null;
  currentDecade: number;
  onSelect: (year: number) => void;
}

interface InternallyRef {
  selected?: number;
  current?: number;
}

const defaultProps: Partial<YearCalendarProps> = {
  hideHeader: false,
  hideHeaderPreviousRange: false,
  hideHeaderNextRange: false,
};

function getDefaultYear() {
  const today = new Date();
  return today.getFullYear();
}

function YearCalendar(props: YearCalendarProps) {
  const yearProp = props.value || getDefaultYear();
  const currentDecadeProp =
    props.currentDecade || dateUtil.getDecade(yearProp)[0];

  const internallyRef = React.useRef<InternallyRef | null>(null);

  let isInternally = false;
  if (internallyRef.current) {
    isInternally =
      !!internallyRef.current.selected || !!internallyRef.current.current;
  }

  const [selectedYear, setSelectedYear] = useChanges(yearProp, isInternally);

  const [currentDecade, setCurrentDecade] = useChanges(
    currentDecadeProp,
    isInternally
  );

  if (internallyRef.current) {
    const ref = internallyRef.current;
    if (ref.selected !== void 0) {
      props.onChange && props.onChange(ref.selected);
    }
    if (ref.current !== void 0) {
      props.onCurrentDecadeChange && props.onCurrentDecadeChange(ref.current);
    }
    internallyRef.current = null;
  }

  const handleDecadeChange = (decade: number) => {
    if (decade !== currentDecade) {
      internallyRef.current = { current: decade };
      setCurrentDecade(decade);
    }
  };

  const handleSelectDate = (year: number) => {
    if (year !== selectedYear) {
      const ref: InternallyRef = { selected: year };
      setSelectedYear(year);
      if (year < currentDecade) {
        const decade = currentDecade - 10;
        ref.current = decade;
        setCurrentDecade(decade);
      }
      if (year > currentDecade + 9) {
        const decade = currentDecade + 10;
        ref.current = decade;
        setCurrentDecade(decade);
      }
      internallyRef.current = ref;
    }
    props.onSelect && props.onSelect(year);
  };

  const prefix = component.getComponentPrefix('calendar');
  const cls = component.getComponentClasses('year-calendar', props);

  return (
    <div className={cx(prefix, cls)} style={props.style}>
      <YearCalendarHeader
        {...props}
        currentDecade={currentDecade}
        onDecadeChange={handleDecadeChange}
      />
      <YearCalendarBody
        {...props}
        value={selectedYear}
        currentDecade={currentDecade}
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

YearCalendar.defaultProps = defaultProps;

function YearCalendarHeader(props: YearCalendarHeaderProps) {
  const { currentDecade, onDecadeChange } = props;
  const [decadeVisible, setDecadeVisible] = React.useState(false);

  const handlePreviousDecade = () => {
    onDecadeChange && onDecadeChange(currentDecade - 10);
  };
  const handleNextDecade = () => {
    onDecadeChange && onDecadeChange(currentDecade + 10);
  };

  const handleDecadeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!decadeVisible) setDecadeVisible(true);
  };

  const handleDecadeSelect = (decade: number) => {
    if (decade !== currentDecade) onDecadeChange && onDecadeChange(decade);
    setDecadeVisible(false);
  };

  const title = (
    <a href="javascript:;" onClick={handleDecadeClick}>
      {currentDecade}-{currentDecade + 9}
    </a>
  );

  const prefix = getPrefix();
  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      nextRangeVisible={!props.hideHeaderNextRange}
      previousVisible={false}
      nextVisible={false}
      onPreviousRange={handlePreviousDecade}
      onNextRange={handleNextDecade}
      onClick={props.onHeaderClick}>
      {decadeVisible && (
        <DecadeCalendar
          className={prefix + '-selector'}
          value={currentDecade}
          onSelect={handleDecadeSelect}
        />
      )}
    </CalendarHeader>
  );
}

function YearCalendarBody(props: YearCalendarBodyProps) {
  const years = getYearsByDecade(props.currentDecade);
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => {
          return (
            <CalendarRow key={row}>
              {[0, 1, 2].map(column => {
                const year = years[row * 3 + column];
                return (
                  <YearCalendarCell
                    {...props}
                    key={year}
                    year={year}
                    isFirst={year === years[0]}
                    isLast={year === years[years.length - 1]}
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

function YearCalendarCell(
  props: YearCalendarBodyProps & {
    year: number;
    isFirst: boolean;
    isLast: boolean;
  }
) {
  const { yearFormatter = defaultYearFormatter } = props;
  const selected = props.year === props.value;
  const handleClick = () => props.onSelect(props.year);
  const prefix = getPrefix();
  return (
    <CalendarCell
      selected={selected}
      outside={props.isFirst || props.isLast}
      onClick={handleClick}>
      <CalendarCellNode className={prefix + '-year'}>
        {yearFormatter(props.year)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function getYearsByDecade(year: number) {
  const years: number[] = [];
  const decade = dateUtil.getDecade(year);
  for (let i = decade[0] - 1; i <= decade[1] + 1; i++) {
    years.push(i);
  }
  return years;
}

function defaultYearFormatter(year: number) {
  return '' + year;
}

export default YearCalendar;
