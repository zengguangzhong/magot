import React from 'react';
import cx from 'classnames';

import Icon from '../Icon';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './InputBase.less';

export interface InputBaseProps<T extends HTMLElement>
  extends component.InputFormComponent<T, React.ReactText>,
    component.IconableComponent {
  /**
   * 最短字符数，默认无限制
   */
  minLength?: number;

  /**
   * 最长字符数，默认无限制
   */
  maxLength?: number;

  /**
   * 输入框内容发生变化时的回调函数
   */
  onChange?: (e: React.ChangeEvent<T>) => void;

  /**
   * 图标点击时的回调函数
   */
  onIconClick?: () => void;
}

const defaultProps: Partial<InputBaseProps<HTMLElement>> = {
  ...component.getDefaultInputFormProps(),
};

interface InputBaseElement extends HTMLElement {
  value: string;
}

function Input<T extends InputBaseElement>(
  props: InputBaseProps<T> & { children: any }
) {
  const {
    className,
    style,
    icon,
    iconPosition,
    iconSize,
    clearable,
    children,
    onIconClick,
    onClear,
    onPressEnter,
    ...formProps
  } = props;

  if (!React.isValidElement(children)) return null;

  const inputRef = React.useRef<T>(null);
  const [clearableState, setClearableState] = React.useState(false);

  const updateClearableState = (value: string) => {
    if (!clearable) return;
    const state = value.length !== 0;
    if (state !== clearableState) setClearableState(state);
  };

  React.useEffect(() => {
    if (clearable && inputRef.current) {
      const value = inputRef.current.value;
      updateClearableState(value);
    }
  });

  const type = 'input';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const handleChange = (e: React.ChangeEvent<T>) => {
    if (clearable) updateClearableState(e.target.value);
    formProps.onChange && formProps.onChange(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<T>) => {
    const keyCode = e.keyCode || e.which;
    if (onPressEnter && keyCode === 13) onPressEnter(e);
  };

  const handleClear = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    const e = {
      target: inputRef.current,
      currentTarget: inputRef.current,
    } as React.ChangeEvent<T>;
    inputRef.current.value = '';
    if (clearableState) setClearableState(false);
    formProps.onChange && formProps.onChange(e);
    onClear && onClear();
  };

  const input = React.cloneElement<any>(children, {
    ...formProps,
    ref: inputRef,
    className: prefix + '-control',
    onChange: handleChange,
    onKeyUp: onPressEnter ? handleKeyUp : undefined,
  });

  return (
    <div className={cls} style={style}>
      <Iconable
        className={prefix + '-icon'}
        name={icon}
        position={iconPosition || 'right'}
        size={iconSize}
        onClick={onIconClick}
        style={{ cursor: onIconClick ? 'pointer' : undefined }}>
        {input}
      </Iconable>
      {clearable && (
        <Icon
          name="close"
          className={cx(
            prefix + '-icon',
            prefix + '-clear',
            clearableState && 'show'
          )}
          onClick={handleClear}
        />
      )}
    </div>
  );
}

Input.defaultProps = defaultProps;

export default Input;
