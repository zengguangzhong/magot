import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { PopupProps } from './Popup';
import * as component from '../component';
import { getAdjustment, getAlignment } from '../../utils/alignment';

export interface OverlayProps
  extends PopupProps,
    component.MouseMovableComponent<HTMLElement> {
  /**
   * 开始离场(popdown)
   */
  leaving: boolean;

  /**
   * 是否可见
   */
  visible: boolean;

  /**
   * 目标组件的显示大小和绝对位置(相对于popup的容器来计算)
   */
  target: { size: Size; offset: Offset };

  /**
   * 与目标组件之间的间距
   */
  space?: number;

  /**
   * 离场动画结束的回调函数
   */
  onLeaved: () => void;
}

function PopupOverlay(props: OverlayProps) {
  if (!props.visible) return null;

  const { overlay, leaving, target, onLeaved } = props;
  const overlayProps = overlay.props;

  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const visibility = size.width > 0 && size.height > 0;

  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = popupRef.current;
    if (node && !visibility) {
      setSize({ width: node.offsetWidth, height: node.offsetHeight });
    }
    const handleTransitionEnd = () => leaving && onLeaved();
    node && node.addEventListener('transitionend', handleTransitionEnd, false);
    return () => {
      node && node.removeEventListener('transitionend', handleTransitionEnd);
    };
  });

  const adjust = getAdjustment(props.space);
  const alignment = getAlignment(props.space);
  const align = adjust[props.align || 'top'](size, target);
  const position = alignment[align](size, target);
  const classes = component.getComponentClasses('popup', props, {
    showed: visibility && !leaving,
  });

  return ReactDOM.createPortal(
    <div
      className={classes}
      ref={popupRef}
      style={position}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}>
      {React.cloneElement(overlay, {
        className: cx(overlayProps.className, align.toLowerCase()),
      })}
    </div>,
    document.body
  );
}

export default PopupOverlay;
