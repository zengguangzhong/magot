import React, { useEffect } from 'react';

import './Popup.less';

import PopupOverlay, { OverlayProps } from './PopupOverlay';
import * as component from '../component';
import * as node from '../../utils/node';
import { Alignment } from '../../utils/alignment';

export type PopupTrigger = 'hover' | 'click' | 'contextMenu';

export interface PopupProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 对齐位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,
   * `bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  align?: Alignment;

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
}

interface WrappedComponentProps
  extends component.NestedComponent,
    component.MouseEventComponent<HTMLElement> {}

type DispatchBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type DispatchSize = React.Dispatch<React.SetStateAction<Size>>;
type DispatchOffset = React.Dispatch<React.SetStateAction<Offset>>;

const defaultProps: Partial<PopupProps> = {
  align: 'top',
  space: 10,
  trigger: 'hover',
};

function Popup(props: PopupProps) {
  if (!props.children || !props.overlay) return null;

  const [leaving, setLeaving] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [targetOffset, setTargetOffset] = React.useState({ left: 0, top: 0 });
  const [targetSize, setTargetSize] = React.useState({ width: 0, height: 0 });

  const handleTriggerEnter = getTriggerEnterHandler(
    setLeaving,
    setVisible,
    setTargetOffset,
    setTargetSize,
    props.trigger === 'contextMenu'
  );
  const handleTriggerLeave = getTriggerLeaveHanlder(setLeaving);

  const wrappedProps: WrappedComponentProps = {};
  const overlayProps: OverlayProps = {
    ...props,
    leaving,
    visible,
    target: { size: targetSize, offset: targetOffset },
    onLeaved: () => setVisible(false),
  };

  const handleStopPropagationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleTriggerLeave();
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
        overlayProps.onMouseEnter = () => setLeaving(false);
        overlayProps.onMouseLeave = handleTriggerLeave;
      }
      break;
    }
  }

  useEffect(() => {
    if (activeGlobalClick(props.trigger) && visible && !leaving) {
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
  return React.cloneElement(React.Children.only(children), otherProps);
}

function getTriggerEnterHandler(
  setLeaving: DispatchBoolean,
  setVisible: DispatchBoolean,
  setTargetOffset: DispatchOffset,
  setTargetSize: DispatchSize,
  isContextMenu?: boolean
) {
  return (e: React.MouseEvent<HTMLElement>) => {
    if (isContextMenu) e.preventDefault();
    const target = e.currentTarget;
    setLeaving(false);
    setVisible(true);
    if (!isContextMenu) {
      const offset = node.offset(target, document.body);
      offset && setTargetOffset(offset);
      setTargetSize({ width: target.offsetWidth, height: target.offsetHeight });
    } else {
      const offset = { left: e.pageX, top: e.pageY };
      setTargetOffset(offset);
    }
  };
}

function getTriggerLeaveHanlder(setLeaving: DispatchBoolean) {
  return () => {
    setLeaving(true);
  };
}

function activeGlobalClick(trigger?: PopupTrigger) {
  return !!trigger && ['click', 'contextMenu'].includes(trigger);
}

Popup.defaultProps = defaultProps;

export default Popup;
