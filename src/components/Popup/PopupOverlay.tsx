/// <reference path="../../../lib.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { PopupProps } from './Popup';
import Animation from '../Animation';
import * as component from '../component';
import { getAdjustment, getPlacement } from '../../utils/placement';

export interface OverlayProps
  extends PopupProps,
    component.MouseEventComponent<HTMLElement> {
  /**
   * 是否可见
   */
  visible: boolean;

  /**
   * 目标组件的显示大小和绝对位置(相对于popup的容器来计算)
   */
  target: { size: Size; offset: Offset };
}

function PopupOverlay(props: OverlayProps) {
  const {
    className,
    style,
    children,
    name,
    placement: placementProp,
    visible,
    overlay,
    target,
    trigger,
    space,
    preventOut,
    clickClosable,
    leaveDelay,
    removeWhenClose,
    onOpen,
    onClose,
    ...mouseEventProps
  } = props;
  const overlayProps = overlay.props;

  const popupRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const visibility = size.width > 0 && size.height > 0;

  React.useEffect(() => {
    const node = popupRef.current;
    if (node && !visibility) {
      setSize({ width: node.offsetWidth, height: node.offsetHeight });
    }
  });

  let position;
  let placement = placementProp || 'top';
  if (visibility) {
    const adjust = getAdjustment(space);
    const placementFn = getPlacement(space);
    placement = adjust[placement](size, target);
    position = placementFn[placement](size, target);
  }

  const type = 'popup';
  const cls = component.getComponentClasses(type, props, {
    popped: visibility,
  });

  return ReactDOM.createPortal(
    <Animation
      ref={popupRef}
      name={name || type}
      visible={visible}
      removeWhenHidden={removeWhenClose}>
      <div {...mouseEventProps} className={cls} style={position}>
        {React.cloneElement(overlay, {
          className: cx(overlayProps.className, placement.toLowerCase()),
        })}
      </div>
    </Animation>,
    document.body
  );
}

export default PopupOverlay;
