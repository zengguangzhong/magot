import React, { useEffect } from 'react';

import PopupOverlay, { OverlayProps } from './PopupOverlay';
import * as component from '../component';
import * as node from '../../utils/node';
import { Placement } from '../../utils/placement';

import './Popup.less';

export type PopupTrigger = 'hover' | 'click' | 'contextMenu';

export interface PopupProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 应用Popup的组件名称
   */
  name?: string;

  /**
   * 对齐位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,
   * `bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  placement?: Placement;

  /**
   * 弹出层组件，可以是任意需要被popup出来的组件
   */
  overlay: React.ReactElement<any>;

  /**
   * 当鼠标悬停在弹出层组件上时，是否阻止它隐藏
   */
  preventOut?: boolean;

  /**
   * 弹出层组件与目标组件之间的间距
   * @default 10
   */
  space?: number;

  /**
   * 触发弹出层的行为方式，可选值：`hover`, `click`, `contextMenu`，默认`hover`
   * @default hover
   */
  trigger?: PopupTrigger;

  /**
   * 当点击弹出层组件时，是否隐藏自己，默认隐藏
   * @default true
   */
  clickClosable?: boolean;

  /**
   * 离场延迟时间，默认100ms
   * @default 100
   */
  leaveDelay?: number;

  /**
   * 弹出层打开时的回调函数
   */
  onOpen?: () => void;

  /**
   * 弹出层关闭时的回调函数
   */
  onClose?: () => void;
}

interface WrappedComponentProps
  extends component.NestedComponent,
    component.MouseEventComponent<HTMLElement> {}

const defaultProps: Partial<PopupProps> = {
  placement: 'top',
  space: 10,
  trigger: 'hover',
  clickClosable: true,
  leaveDelay: 100,
};

function Popup(props: PopupProps) {
  if (!props.children || !props.overlay) return null;

  const [visible, setVisible] = React.useState(false);
  const [targetOffset, setTargetOffset] = React.useState({ left: 0, top: 0 });
  const [targetSize, setTargetSize] = React.useState({ width: 0, height: 0 });

  let leaveDelayTimer = 0;

  const handleTriggerEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (leaveDelayTimer) window.clearTimeout(leaveDelayTimer);
    const isContextMenu = props.trigger === 'contextMenu';
    if (isContextMenu) e.preventDefault();
    const target = e.currentTarget;
    setVisible(true);
    if (!isContextMenu) {
      const offset = node.offset(target, document.body);
      offset && setTargetOffset(offset);
      setTargetSize({ width: target.offsetWidth, height: target.offsetHeight });
    } else {
      const offset = { left: e.pageX, top: e.pageY };
      setTargetOffset(offset);
    }
    props.onOpen && props.onOpen();
  };

  const handleTriggerLeave = () => {
    leaveDelayTimer = window.setTimeout(() => {
      setVisible(false);
      props.onClose && props.onClose();
    }, props.leaveDelay);
  };

  const wrappedProps: WrappedComponentProps = {};
  const overlayProps: OverlayProps = {
    ...props,
    visible,
    target: { size: targetSize, offset: targetOffset },
  };

  const handleStopPropagationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (props.clickClosable) handleTriggerLeave();
  };

  switch (props.trigger) {
    case 'click': {
      wrappedProps.onClick = handleTriggerEnter;
      overlayProps.onClick = handleStopPropagationClick;
      break;
    }
    case 'contextMenu': {
      wrappedProps.onContextMenu = handleTriggerEnter;
      overlayProps.onClick = handleStopPropagationClick;
      overlayProps.space = 0;
      break;
    }
    // hover
    default: {
      wrappedProps.onMouseEnter = handleTriggerEnter;
      wrappedProps.onMouseLeave = handleTriggerLeave;
      if (props.preventOut) {
        overlayProps.onMouseEnter = () => {
          if (leaveDelayTimer) window.clearTimeout(leaveDelayTimer);
          setVisible(true);
        };
        overlayProps.onMouseLeave = handleTriggerLeave;
      }
      break;
    }
  }

  useEffect(() => {
    if (activeGlobalClick(props.trigger) && visible) {
      window.addEventListener('click', handleTriggerLeave);
    }
    return () => window.removeEventListener('click', handleTriggerLeave);
  });

  return (
    <>
      <WrappedComponent {...wrappedProps}>{props.children}</WrappedComponent>
      <PopupOverlay {...overlayProps} />
    </>
  );
}

function WrappedComponent(props: WrappedComponentProps) {
  const { children, ...otherProps } = props;
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, otherProps);
}

function activeGlobalClick(trigger?: PopupTrigger) {
  return !!trigger && ['click', 'contextMenu'].includes(trigger);
}

Popup.defaultProps = defaultProps;

export default Popup;
