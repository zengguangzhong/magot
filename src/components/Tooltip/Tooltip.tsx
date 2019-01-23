import React, {
  useState,
  cloneElement,
  Children,
  ReactNode,
  MouseEvent,
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';

import './Tooltip.less';

import * as component from '../component';
import * as node from '../../utils/node';
import { getAdjustment, getAlignment, Alignment } from '../../utils/alignment';

export interface TooltipProps
  extends component.ComponentBase,
    component.NestedComponent {
  /**
   * 提示文案
   */
  title: string | ReactNode;

  /**
   * 气泡位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  align?: Alignment;
}

interface WrappedComponentProps extends component.NestedComponent {
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void;
}

interface OverlayProps extends TooltipProps {
  hidden?: boolean;
  visible: boolean;
  targetOffset: Offset;
  targetSize: Size;
}

const transitionDuration = 200;
const adjust = getAdjustment(10);
const alignment = getAlignment(10);

const defaultProps: Partial<TooltipProps> = {
  align: 'top',
};

function Tooltip(props: TooltipProps) {
  if (!props.title || !props.children) return null;

  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [targetOffset, setTargetOffset] = useState({ left: 0, top: 0 });
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });

  let leaveTimer = 0;

  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    setHidden(false);
    setVisible(true);
    window.clearTimeout(leaveTimer);

    const target = e.currentTarget;
    const offet = node.offset(target, document.body);
    if (offet) setTargetOffset(offet);
    setTargetSize({ width: target.offsetWidth, height: target.offsetHeight });
  };

  const onMouseLeave = () => {
    setHidden(true);
    window.clearTimeout(leaveTimer);
    leaveTimer = window.setTimeout(() => {
      window.clearTimeout(leaveTimer);
      setVisible(false);
    }, transitionDuration);
  };

  return (
    <>
      <WrappedComponent onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {props.children}
      </WrappedComponent>
      <Overlay
        {...props}
        hidden={hidden}
        visible={visible}
        targetOffset={targetOffset}
        targetSize={targetSize}
      />
    </>
  );
}

function WrappedComponent(props: WrappedComponentProps) {
  const { children, ...otherProps } = props;
  return cloneElement(Children.only(children), otherProps);
}

function Overlay(props: OverlayProps) {
  if (!props.visible) return null;

  const { targetOffset, targetSize } = props;
  const overlayRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const visibility = size.width > 0 && size.height > 0;
  const target = { size: targetSize, offset: targetOffset };

  useEffect(() => {
    const node = overlayRef.current;
    if (node && !visibility) {
      setSize({ width: node.offsetWidth, height: node.offsetHeight });
    }
  });

  const align = adjust[props.align || 'top'](size, target);
  const pos = alignment[align](size, target);

  const type = 'tooltip';
  const arrow = getArrowAlignment(align);
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-${arrow}`]: true,
    show: visibility && !props.hidden,
  });
  return ReactDOM.createPortal(
    <div ref={overlayRef} className={cls} style={{ ...pos }}>
      {props.title}
    </div>,
    document.body
  );
}

function getArrowAlignment(align: Alignment) {
  const f = align[0];
  const t = align.replace(/[a-z]/g, '');
  return f + t.toLowerCase();
}

Tooltip.defaultProps = defaultProps;

export default Tooltip;
