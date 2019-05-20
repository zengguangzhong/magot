import React from 'react';

import Button from '../Button';
import InputBase from '../InputBase';
import Hotkey, { HotkeyData } from '../Hotkey';
import * as component from '../component';

import './InputNumber.less';

export interface InputNumberProps
  extends component.FormComponent<HTMLInputElement, number>,
    component.KeyboardEventComponent<HTMLInputElement>,
    component.SizedComponent {
  /**
   * 最小值
   * @default -Infinity
   */
  min?: number;

  /**
   * 最大值
   * @default Infinity
   */
  max?: number;

  /**
   * 每次改变的步长，可以是小数
   * @default 1
   */
  step?: number;

  /**
   * 数值精度，用来格式化显示小数
   */
  precision?: number;

  /**
   * 将真实数值格式化为输入框内的显示值
   */
  formatter?: (value: number | string) => string;

  /**
   * 将输入框内的显示值解析为真实数值，搭配`formatter`一起使用
   */
  parser?: (value: string) => number;

  /**
   * 数值改变时的回调函数
   */
  onChange?: (value: number) => void;
}

const defaultProps: Partial<InputNumberProps> = {
  ...component.getDefaultSizedProps(),
  min: -Infinity,
  max: Infinity,
  step: 1,
};

const hotkeys: HotkeyData[] = [];
const TOP_KEY = 38;
const BOTTOM_KEY = 40;
[TOP_KEY, BOTTOM_KEY].forEach(key => {
  hotkeys.push({ key });
  hotkeys.push({ key, shiftKey: true });
  hotkeys.push({ key, ctrlKey: true });
  hotkeys.push({ key, metaKey: true });
});

function getDecimalLength(n: number) {
  const s = n.toString().split('.');
  return s.length > 1 ? s[1].length : 0;
}

function toPrecision(a: number, b: number, o: string) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return o === '+' ? a + b : a - b;
  }
  const len = 10 ** Math.max(getDecimalLength(a), getDecimalLength(b));
  const val = o === '+' ? a * len + b * len : a * len - b * len;
  return val / len;
}

function InputNumber(props: InputNumberProps) {
  const {
    min = -Infinity,
    max = Infinity,
    step = 1,
    defaultValue,
    value,
    precision,
    formatter,
    parser,
    onChange,
    ...baseProps
  } = props;
  const type = 'input-number';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, {}, props.className);

  const [inputValue, setInputValue] = React.useState<string | null>(null);
  const [currentValue, setCurrentValue] = React.useState(
    defaultValue || value || 0
  );
  const [focused, setFocused] = React.useState(false);

  const updateCurrentValue = (val: number) => {
    const value = Math.min(max, Math.max(min, val));
    setInputValue(null);
    if (value !== currentValue) {
      setCurrentValue(value);
      onChange && onChange(value);
    }
  };

  const incrementByStep = (step: number) => {
    const val = toPrecision(currentValue, step, '+');
    updateCurrentValue(val);
  };

  const decrementByStep = (step: number) => {
    const val = toPrecision(currentValue, step, '-');
    updateCurrentValue(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let val = parser ? parser(inputValue) : parseFloat(inputValue);
    if (isNaN(val)) val = currentValue;
    updateCurrentValue(val);
    if (focused) setFocused(false);
  };

  const handleFocus = () => {
    if (!focused) setFocused(true);
  };

  const handleIncrement = () => incrementByStep(step);
  const handleDecrement = () => decrementByStep(step);

  const handleHotkey = (data: HotkeyData) => {
    const { key, shiftKey, ctrlKey, metaKey } = data;
    const multiple = shiftKey ? 10 : ctrlKey || metaKey ? 0.1 : 1;
    const fns: Record<string, ((step: number) => void) | undefined> = {
      [TOP_KEY]: incrementByStep,
      [BOTTOM_KEY]: decrementByStep,
    };
    const fn = fns[key];
    fn && fn(multiple * step);
  };

  let displayValue: string | number = currentValue;
  if (precision !== void 0) {
    displayValue = displayValue.toFixed(precision);
  }

  if (inputValue !== null) displayValue = inputValue;
  if (formatter) displayValue = formatter(displayValue);

  return (
    <Hotkey
      active={focused}
      hotkeys={hotkeys}
      ignoreEditableNode={false}
      onTrigger={handleHotkey}>
      <div className={prefix + '-wrapper'}>
        <InputBase
          {...baseProps}
          className={cls}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}>
          <input type="text" min={min} max={max} step={step} />
        </InputBase>
        <Button.Group disabled={props.disabled}>
          <Button
            icon="caret"
            disabled={max - currentValue < step}
            onClick={handleIncrement}
          />
          <Button
            icon="caret"
            disabled={currentValue - min < step}
            onClick={handleDecrement}
          />
        </Button.Group>
      </div>
    </Hotkey>
  );
}

InputNumber.defaultProps = defaultProps;

export default InputNumber;
