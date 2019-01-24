import React from 'react';

import './Popup.less';

import PopupOverlay from './PopupOverlay';
import * as component from '../component';
import * as node from '../../utils/node';
import { Alignment } from '../../utils/alignment';

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
}

interface WrappedComponentProps
  extends component.NestedComponent,
    component.MouseMovableComponent<HTMLElement> {}

type DispatchBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type DispatchSize = React.Dispatch<React.SetStateAction<Size>>;
type DispatchOffset = React.Dispatch<React.SetStateAction<Offset>>;

const defaultProps: Partial<PopupProps> = {
  align: 'top',
  space: 10,
};

function Popup(props: PopupProps) {
  if (!props.children || !props.overlay) return null;

  const [leaving, setLeaving] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [targetOffset, setTargetOffset] = React.useState({ left: 0, top: 0 });
  const [targetSize, setTargetSize] = React.useState({ width: 0, height: 0 });

  const hanldeTargetEnter = getTargetEnterHandler(
    setLeaving,
    setVisible,
    setTargetOffset,
    setTargetSize
  );
  const handleTargetLeave = () => setLeaving(true);

  let handleOverlayEnter, handleOverlayLeave;
  const handleOverlayLeaved = () => setVisible(false);

  if (props.preventOut) {
    handleOverlayEnter = () => setLeaving(false);
    handleOverlayLeave = handleTargetLeave;
  }

  return (
    <>
      <WrappedComponent
        onMouseEnter={hanldeTargetEnter}
        onMouseLeave={handleTargetLeave}>
        {props.children}
      </WrappedComponent>
      <PopupOverlay
        {...props}
        leaving={leaving}
        visible={visible}
        target={{ size: targetSize, offset: targetOffset }}
        onMouseEnter={handleOverlayEnter}
        onMouseLeave={handleOverlayLeave}
        onLeaved={handleOverlayLeaved}
      />
    </>
  );
}

function WrappedComponent(props: WrappedComponentProps) {
  const { children, ...otherProps } = props;
  return React.cloneElement(React.Children.only(children), otherProps);
}

function getTargetEnterHandler(
  setLeaving: DispatchBoolean,
  setVisible: DispatchBoolean,
  setTargetOffset: DispatchOffset,
  setTargetSize: DispatchSize
) {
  return (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const offet = node.offset(target, document.body);
    setLeaving(false);
    setVisible(true);
    offet && setTargetOffset(offet);
    setTargetSize({ width: target.offsetWidth, height: target.offsetHeight });
  };
}

Popup.defaultProps = defaultProps;

export default Popup;
