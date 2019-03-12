import React from 'react';

import DatePickerWrapper from './DatePickerWrapper';
import Calendar, { CalendarProps } from '../Calendar';
import * as component from '../component';

export interface DatePickerProps
  extends component.InputFormComponent<HTMLInputElement, AcceptableDate | null>,
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

const Picker = DatePickerWrapper(Calendar);

function DatePicker(props: DatePickerProps) {
  return <Picker {...props}>{props.children}</Picker>;
}

export default DatePicker;
