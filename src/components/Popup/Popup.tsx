import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import './Popup.less';

import * as component from '../component';
import * as node from '../../utils/node';
import { getAdjustment, getAlignment, Alignment } from '../../utils/alignment';

export interface PopupProps
  extends component.ComponentBase,
    component.NestedComponent {
  /**
   * 对齐位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  align?: Alignment;

  /**
   * 弹出层组件，可以是任意需要被popup出来的组件
   */
  overlay: React.ReactElement<any>;
}

interface WrappedComponentProps extends component.NestedComponent {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

interface OverlayProps extends PopupProps {
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
   * 离场动画结束的回调函数
   */
  onLeaved: () => void;
}

const adjust = getAdjustment(10);
const alignment = getAlignment(10);

const defaultProps: Partial<PopupProps> = {
  align: 'top',
};

function Popup(props: PopupProps) {
  if (!props.children || !props.overlay) return null;

  const [leaving, setLeaving] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [targetOffset, setTargetOffset] = React.useState({ left: 0, top: 0 });
  const [targetSize, setTargetSize] = React.useState({ width: 0, height: 0 });

  const hanldeMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const offet = node.offset(target, document.body);
    setLeaving(false);
    setVisible(true);
    offet && setTargetOffset(offet);
    setTargetSize({ width: target.offsetWidth, height: target.offsetHeight });
  };

  const handleMouseLeave = () => setLeaving(true);
  const handleLeaved = () => setVisible(true);

  return (
    <>
      <WrappedComponent
        onMouseEnter={hanldeMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {props.children}
      </WrappedComponent>
      <PopupOverlay
        {...props}
        leaving={leaving}
        visible={visible}
        target={{ size: targetSize, offset: targetOffset }}
        onLeaved={handleLeaved}
      />
    </>
  );
}

function WrappedComponent(props: WrappedComponentProps) {
  const { children, ...otherProps } = props;
  return React.cloneElement(React.Children.only(children), otherProps);
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

  const align = adjust[props.align || 'top'](size, target);
  const position = alignment[align](size, target);
  const classes = component.getComponentClasses('popup', props, {
    showed: visibility && !leaving,
  });

  return ReactDOM.createPortal(
    <div className={classes} ref={popupRef} style={position}>
      {React.cloneElement(overlay, {
        className: cx(overlayProps.className, align.toLowerCase()),
      })}
    </div>,
    document.body
  );
}

Popup.defaultProps = defaultProps;

export default Popup;
