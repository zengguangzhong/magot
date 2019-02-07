import React from 'react';
import cx from 'classnames';

import * as component from '../component';
import { useCreated } from '../../hooks/created';
import { useAnimation } from '../../hooks/animation';

export interface AnimationProps extends component.NestedComponent {
  /**
   * 应用动画效果的组件名称
   */
  name: string;

  /**
   * 组件是否可见
   * @default false
   */
  visible?: boolean;

  /**
   * 当组件隐藏后，是否立刻销毁。默认只是样式隐藏。
   * @default false
   */
  removeWhenHidden?: boolean;

  /**
   * 入场动画结束后的回调函数
   */
  onEnter?: () => void;

  /**
   * 离场动画结束后的回调函数
   */
  onLeave?: () => void;
}

function Animation(props: AnimationProps, ref?: React.Ref<HTMLElement>) {
  if (!React.isValidElement(props.children)) return null;

  const { visible, removeWhenHidden, onEnter, onLeave } = props;

  const childRef = (ref || React.useRef<HTMLElement>(null)) as React.RefObject<
    HTMLElement
  >;
  const created = useCreated(childRef);
  const animation = useAnimation(!!visible, childRef, () => {
    visible ? onEnter && onEnter() : onLeave && onLeave();
  });
  const hidden = animation === null && !visible;

  if ((!visible && !created) || (hidden && removeWhenHidden)) return null;

  const element = props.children as React.ReactElement<any>;
  const prefix = component.getComponentPrefix(props.name);
  const className = cx(element.props.className, {
    [`${prefix}-${animation}`]: !!animation,
  });
  const style = {
    ...element.props.style,
    display: hidden && !removeWhenHidden ? 'none' : '',
  };

  return React.cloneElement(element, { ref: childRef, className, style });
}

export default React.forwardRef(Animation);
