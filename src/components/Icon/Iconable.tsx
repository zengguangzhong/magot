import React from 'react';
import cx from 'classnames';
import Icon from './Icon';
import * as component from '../component';

export type IconPosition = 'left' | 'right';

export interface IconableProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 图标
   */
  name?: string;

  /**
   * 是否旋转图标
   */
  spin?: boolean;

  /**
   * 图标位置，可选值有：`left`, `right`，默认`left`。
   * @default left
   */
  position?: IconPosition;

  /**
   * 图标大小，即`Icon`组件的`fontSize`属性
   */
  size?: number;

  /**
   * 图标点击后的回调函数
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const defaultProps: Partial<IconableProps> = {
  position: 'left',
};

function Iconable(props: IconableProps) {
  const { name, position, children } = props;
  const items = [children];
  const cls = position ? { [position]: !!children } : '';
  let icon = name ? (
    <Icon key="1" {...props} className={cx(cls, props.className)} />
  ) : null;
  position === 'right' ? items.push(icon) : items.unshift(icon);
  return <>{items}</>;
}

Iconable.defaultProps = defaultProps;

export default Iconable;
