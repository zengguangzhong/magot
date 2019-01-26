import { ReactNode, CSSProperties } from 'react';
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
  style?: CSSProperties;
}

export interface NestedComponent {
  children?: ReactNode;
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
>(type: string, props: P, ...classes: any[]) {
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

/**
 *
 *
 * @export
 * @template P
 * @template N
 * @param {P} props
 * @param {string[]} excludeProps
 * @returns {N}
 */
export function getNativeProps<P, N>(props: P, excludeProps: string[]) {
  const nativeProps: Record<string, any> = {};
  for (const key in props) {
    if (excludeProps.indexOf(key) === -1) {
      nativeProps[key] = props[key];
    }
  }
  return nativeProps as N;
}
