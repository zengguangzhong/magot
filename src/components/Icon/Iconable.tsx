import React from 'react';
import Icon from './Icon';
import * as component from '../component';

export type IconPosition = 'left' | 'right';

export interface IconableProps extends component.NestedComponent {
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
}

const defaultProps: Partial<IconableProps> = {
  position: 'left',
};

function Iconable(props: IconableProps) {
  const children = [props.children];
  let icon = props.name ? <Icon key="1" {...props} /> : null;
  if (props.position === 'right') {
    children.push(icon);
  } else {
    children.unshift(icon);
  }
  return <>{children}</>;
}

Iconable.defaultProps = defaultProps;

export default Iconable;
