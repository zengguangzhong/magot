/// <reference path="../../../lib.d.ts" />
import React from 'react';
import cx from 'classnames';
import { CalendarBaseProps, getDefaultBaseProps } from './Calendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import CalendarGrid from './CalendarGrid';
import CalendarRow from './CalendarRow';
import CalendarCell from './CalendarCell';
import CalendarCellNode from './CalendarCellNode';
import YearCalendar from './YearCalendar';
import { getPrefix } from './prefix';
import { useChanges } from '../../hooks/changes';
import * as component from '../component';
import DateUtil from '../../utils/date';

export interface MonthCalendarProps extends CalendarBaseProps {
  /**
   * 当前选中年月
   */
  value?: AcceptableDate | null;

  /**
   * 当前展示的年份
   */
  currentYear?: number | null;

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
   * 选中年月发生变化之后的回调函数
   */
  onChange?: (value: Date) => void;

  /**
   * 当前展示年份发生变化之后的回调函数
   */
  onCurrentYearChange?: (year: number) => void;

  /**
   * 选择年月后的回调函数。
   * 不同于`onChange`，当在重复点击已选中年月时，也会触发该回调函数
   */
  onSelect?: (date: Date) => void;
}

interface MonthCalendarHeaderProps extends MonthCalendarProps {
  currentYear: number;
  onYearChange?: (year: number) => void;
}

interface MonthCalendarBodyProps extends MonthCalendarProps {
  value: Date | null;
  currentYear: number;
  onSelect: (date: Date) => void;
}

interface InternallyRef {
  selected?: Date;
  current?: number;
}

const defaultProps: Partial<MonthCalendarProps> = {
  ...getDefaultBaseProps(),
};

function MonthCalendar(props: MonthCalendarProps) {
  const dateProp = props.value ? DateUtil(props.value).toPure(true) : null;
  const currentYearProp =
    props.currentYear || (dateProp || new Date()).getFullYear();

  const internallyRef = React.useRef<InternallyRef | null>(null);

  let isInternally = false;
  if (internallyRef.current) {
    isInternally =
      !!internallyRef.current.selected || !!internallyRef.current.current;
  }

  const [selectedValue, setSelectedValue] = useChanges(
    dateProp,
    isInternally,
    DateUtil.eq
  );

  const [currentYear, setCurrentYear] = useChanges(
    currentYearProp,
    isInternally
  );

  if (internallyRef.current) {
    const ref = internallyRef.current;
    if (ref.selected !== void 0) {
      props.onChange && props.onChange(ref.selected);
    }
    if (ref.current !== void 0) {
      props.onCurrentYearChange && props.onCurrentYearChange(ref.current);
    }
    internallyRef.current = null;
  }

  const handleYearChange = (year: number) => {
    if (year !== currentYear) {
      internallyRef.current = { current: year };
      setCurrentYear(year);
    }
  };

  const handleSelectDate = (date: Date) => {
    if (!DateUtil(date).eq(selectedValue)) {
      internallyRef.current = { selected: date };
      setSelectedValue(date);
    }
    props.onSelect && props.onSelect(date);
  };

  const prefix = component.getComponentPrefix('calendar');
  const cls = component.getComponentClasses('month-calendar', props);

  return (
    <div className={cx(prefix, cls)} style={props.style}>
      <MonthCalendarHeader
        {...props}
        currentYear={currentYear}
        onYearChange={handleYearChange}
      />
      <MonthCalendarBody
        {...props}
        value={selectedValue}
        currentYear={currentYear}
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

MonthCalendar.defaultProps = defaultProps;

function MonthCalendarHeader(props: MonthCalendarHeaderProps) {
  const {
    currentYear,
    headerYearFormatter = defaultHeaderYearFormatter,
    onYearChange,
  } = props;

  const [yearSelectorVisible, setYearSelectorVisible] = React.useState(false);

  const handlePreviousYear = () => {
    onYearChange && onYearChange(currentYear - 1);
  };
  const handleNextYear = () => {
    onYearChange && onYearChange(currentYear + 1);
  };

  const handleYearClick = () => {
    if (!yearSelectorVisible) setYearSelectorVisible(true);
  };

  const handleYearSelect = (year: number) => {
    if (year !== currentYear) {
      props.onYearChange && props.onYearChange(year);
    }
    setYearSelectorVisible(false);
  };

  const prefix = getPrefix();

  const title = (
    <>
      {!props.hideHeader && (
        <a href="javascript:;" onClick={handleYearClick}>
          {headerYearFormatter(currentYear)}
        </a>
      )}
    </>
  );

  return (
    <CalendarHeader
      title={title}
      visible={!props.hideHeader}
      previousRangeVisible={!props.hideHeaderPreviousRange}
      nextRangeVisible={!props.hideHeaderNextRange}
      previousVisible={false}
      nextVisible={false}
      onPreviousRange={handlePreviousYear}
      onNextRange={handleNextYear}
      onClick={props.onHeaderClick}>
      {yearSelectorVisible && (
        <YearCalendar
          className={prefix + '-selector'}
          value={currentYear}
          yearFormatter={props.yearFormatter}
          onSelect={handleYearSelect}
        />
      )}
    </CalendarHeader>
  );
}

function MonthCalendarBody(props: MonthCalendarBodyProps) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <CalendarBody>
      <CalendarGrid>
        {[0, 1, 2, 3].map(row => (
          <CalendarRow key={row}>
            {[0, 1, 2].map(column => {
              const month = months[row * 3 + column];
              return <MonthCalendarCell {...props} key={month} month={month} />;
            })}
          </CalendarRow>
        ))}
      </CalendarGrid>
    </CalendarBody>
  );
}

function MonthCalendarCell(props: MonthCalendarBodyProps & { month: number }) {
  const { value, monthFormatter = defaultMonthFormatter } = props;
  const date = new Date(props.currentYear, props.month);
  const isCurrent = DateUtil.eq(date, DateUtil().toPure(true));
  let selected = value ? props.month === value.getMonth() : false;
  if (props.value == null && props.activeToday) selected = isCurrent;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    props.onSelect(date);
    props.onCellClick && props.onCellClick(e);
  };
  const prefix = getPrefix();
  return (
    <CalendarCell current={isCurrent} selected={selected} onClick={handleClick}>
      <CalendarCellNode className={prefix + '-month'}>
        {monthFormatter(props.month)}
      </CalendarCellNode>
    </CalendarCell>
  );
}

function defaultHeaderYearFormatter(year: number) {
  return year + '年';
}

function defaultMonthFormatter(month: number) {
  const localMonths = '一 二 三 四 五 六 七 八 九 十 十一 十二'.split(' ');
  return localMonths[month] + '月';
}

export default MonthCalendar;
