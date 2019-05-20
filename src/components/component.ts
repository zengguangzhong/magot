import React from 'react';
import cx from 'classnames';
import { IconPosition } from './Icon/Iconable';

export const prefix = 'mgt';

export type ComponentSize = 'normal' | 'small' | 'large';

export interface BaseComponent {
  /**
   * 自定义组件样式类，可用于实现自定义样式
   */
  className?: string;

  /**
   * 高优先级的内联自定义样式，可用于覆盖某些默认样式
   */
  style?: React.CSSProperties;
}

export interface NestedComponent {
  children?: React.ReactNode;
}

export interface SizedComponent {
  /**
   * 设置组件尺寸大小，可选值有: `normal`, `small`, `large`。
   * @default 'normal'
   */
  size?: ComponentSize;
}

export interface DisableComponent {
  /**
   * 是否是禁用状态，当禁用后，组件不可交互
   * @default false
   */
  disabled?: boolean;
}

export interface MouseEventComponent<T extends HTMLElement> {
  onClick?: (e: React.MouseEvent<T>) => void;
  onDoubleClick?: (e: React.MouseEvent<T>) => void;
  onContextMenu?: (e: React.MouseEvent<T>) => void;
  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseEnter?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
  onMouseMove?: (e: React.MouseEvent<T>) => void;
  onMouseOver?: (e: React.MouseEvent<T>) => void;
  onMouseOut?: (e: React.MouseEvent<T>) => void;
}

export interface KeyboardEventComponent<T extends HTMLElement> {
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onKeyPress?: (e: React.KeyboardEvent<T>) => void;
  onKeyUp?: (e: React.KeyboardEvent<T>) => void;
}

export interface FormEventComponent<T extends HTMLElement> {
  onChange?: (e: any, ...extra: any[]) => void;
  onInput?: (e: React.FormEvent<T>) => void;
  onReset?: (e: React.FormEvent<T>) => void;
  onSubmit?: (e: React.FormEvent<T>) => void;
  onInvalid?: (e: React.FormEvent<T>) => void;
}

export interface FocusEventComponent<T extends HTMLElement> {
  onFocus?: (e: React.FocusEvent<T>) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;
}

export interface FormComponent<T extends HTMLElement, V>
  extends BaseComponent,
    FormEventComponent<T>,
    FocusEventComponent<T>,
    DisableComponent {
  /**
   * 表单ID属性
   */
  id?: string;

  /**
   * 表单name属性
   */
  name?: string;

  /**
   * 表单value，用于受控表单组件
   * @see https://reactjs.org/docs/forms.html?#controlled-components
   */
  value?: V;

  /**
   * 表单默认value，用于非受控表单组件
   * @see https://reactjs.org/docs/uncontrolled-components.html
   */
  defaultValue?: V;
}

export interface InputFormComponent<T extends HTMLElement, V>
  extends FormComponent<T, V>,
    KeyboardEventComponent<T>,
    SizedComponent {
  /**
   * 输入框占位符，默认空白
   */
  placeholder?: string;

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
   * 清除输入框内容后的回调函数
   */
  onClear?: () => void;

  /**
   * 按下回车键时的回调函数，通常用在按下回车时执行某个动作的场景
   */
  onPressEnter?: (e: React.KeyboardEvent<T>) => void;
}

export interface IconableComponent {
  /**
   * 图标
   */
  icon?: string;

  /**
   * 图标位置，可选值有：`left`, `right`，默认`left`。
   * @default left
   */
  iconPosition?: IconPosition;

  /**
   * 大小，即`Icon`组件的`fontSize`属性
   */
  iconSize?: number;
}

/**
 *
 *
 * @export
 * @param {string} type 组件类型
 * @returns {string}
 */
export function getComponentPrefix(type: string) {
  return `${prefix}-${type}`;
}

/**
 *
 *
 * @export
 * @param {string} type 组件类型
 * @param {P} props 组件Props
 * @param {...any[]} classes 额外样式
 * @returns {string}
 */
export function getComponentClasses<
  P extends BaseComponent & SizedComponent & DisableComponent
>(type: string, props: Partial<P> = {}, ...classes: any[]) {
  const main = getComponentPrefix(type);
  return cx(
    main,
    {
      [`${main}-sm`]: props.size === 'small',
      [`${main}-lg`]: props.size === 'large',
      [`${main}-disabled`]: !!props.disabled,
    },
    ...classes,
    props.className
  );
}

/**
 *
 *
 * @export
 * @returns {SizedComponent}
 */
export function getDefaultSizedProps(): SizedComponent {
  return { size: 'normal' };
}

/**
 *
 *
 * @export
 * @returns {DisableComponent}
 */
export function getDefaultDisabledProps(): DisableComponent {
  return { disabled: false };
}

export function getDefaultInputFormProps<
  T extends HTMLElement,
  V
>(): InputFormComponent<T, V> {
  return {
    ...getDefaultDisabledProps(),
    ...getDefaultSizedProps(),
    readOnly: false,
    clearable: false,
  };
}

export interface Size {
  width: number;
  height: number;
}

export interface Offset {
  left: number;
  top: number;
}
