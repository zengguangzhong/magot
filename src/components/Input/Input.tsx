import React from 'react';
import cx from 'classnames';

import Icon from '../Icon';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './Input.less';

export interface InputProps
  extends component.FormComponent<HTMLInputElement>,
    component.SizedComponent,
    component.IconableComponent,
    component.KeyboardEventComponent<HTMLInputElement> {
  /**
   * 输入框占位符，默认空白
   */
  placeholder?: string;

  /**
   * 最短字符数，默认无限制
   */
  minLength?: number;

  /**
   * 最长字符数，默认无限制
   */
  maxLength?: number;

  /**
   * 是否是只读输入框
   * @default false
   */
  readOnly?: boolean;

  /**
   * 可清除的输入框，即在输入框右侧显示清除图标
   * @default false
   */
  clearable?: boolean;

  /**
   * 输入框内容发生变化时的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * 图标点击时的回调函数
   */
  onIconClick?: () => void;

  /**
   * 清除输入框内容后的回调函数
   */
  onClear?: () => void;
}

const defaultProps: Partial<InputProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  readOnly: false,
  clearable: false,
};

function Input(props: InputProps) {
  const {
    className,
    style,
    size,
    icon,
    iconPosition,
    iconSize,
    clearable,
    onIconClick,
    onClear,
    ...formProps
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearable) updateClearableState(e.target.value);
    formProps.onChange && formProps.onChange(e);
  };

  const handleClear = () => {
    if (!inputRef.current || !inputRef.current.value) return;
    const e = {
      target: inputRef.current,
      currentTarget: inputRef.current,
    } as React.ChangeEvent<HTMLInputElement>;
    inputRef.current.value = '';
    if (clearableState) setClearableState(false);
    formProps.onChange && formProps.onChange(e);
    onClear && onClear();
  };

  return (
    <div className={cls} style={style}>
      <Iconable
        className={prefix + '-icon'}
        name={icon}
        position={iconPosition || 'right'}
        size={iconSize}
        onClick={onIconClick}
        style={{ cursor: onIconClick ? 'pointer' : undefined }}>
        <input
          {...formProps}
          type="text"
          ref={inputRef}
          className={prefix + '-control'}
          onChange={handleChange}
        />
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
