import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';
import Hotkey from '../Hotkey';
import Animation from '../Animation';
import * as component from '../component';
import { useChanges } from '../../hooks/changes';

import './Modal.less';

export type ModalPlacement = 'center' | 'top';

export interface ModalProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 模态框标题
   */
  title?: string;

  /**
   * 模态框宽度
   * @default 480
   */
  width?: number;

  /**
   * 是否显示关闭按钮
   * @default true
   */
  closable?: boolean;

  /**
   * 是否显示
   * @default false
   */
  visible?: boolean;

  /**
   * 是否显示模态遮罩
   * @default true
   */
  mask?: boolean;

  /**
   * 点击模态遮罩是否关闭模态框
   * @default true
   */
  maskClosable?: boolean;

  /**
   * 按下ESC键是否关闭模态框
   * @default true
   */
  escapeClosable?: boolean;

  /**
   * 模态框位置，可选值：`center`, `top`，默认`center`
   * @default center
   */
  placement?: ModalPlacement;

  /**
   * 模态框层级
   */
  zIndex?: number;

  /**
   * 当模态框关闭后，是否销毁
   * @default false
   */
  removeWhenClosed?: boolean;

  children?:
    | React.FunctionComponentElement<ModalBodyProps>
    | Array<
        | React.FunctionComponentElement<ModalBodyProps>
        | React.FunctionComponentElement<ModalFooterProps>
      >;

  /**
   * 打开模态框时的回调函数
   */
  onOpen?: () => void;

  /**
   * 关闭模态框时的回调函数
   */
  onClose?: () => void;
}

export interface ModalBodyProps
  extends component.BaseComponent,
    component.NestedComponent {}

export interface ModalFooterProps
  extends component.BaseComponent,
    component.NestedComponent {}

const defaultProps: Partial<ModalProps> = {
  width: 480,
  closable: true,
  visible: false,
  mask: true,
  maskClosable: true,
  escapeClosable: true,
  placement: 'center',
  removeWhenClosed: false,
};

function Modal(props: ModalProps) {
  const internallyRef = React.useRef(false);

  const [visibility, setVisibility] = useChanges(
    !!props.visible,
    internallyRef.current
  );

  const type = 'modal';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-${props.placement}`]: !!props.placement,
  });

  const handleClose = () => {
    if (!visibility) return;
    internallyRef.current = true;
    setVisibility(false);
  };

  const handleLeave = () => {
    internallyRef.current = false;
    props.onClose && props.onClose();
  };

  let modal = (
    <Animation
      name={type}
      visible={visibility}
      removeWhenHidden={props.removeWhenClosed}
      onEnter={props.onOpen}
      onLeave={handleLeave}>
      <div className={cls} style={{ ...props.style, zIndex: props.zIndex }}>
        {props.mask && (
          <div
            className={prefix + '-mask'}
            onClick={props.maskClosable ? handleClose : undefined}
          />
        )}
        <div className={prefix + '-content'} style={{ width: props.width }}>
          {props.closable && (
            <Button
              icon="close"
              className={prefix + '-close'}
              onClick={handleClose}
            />
          )}
          {props.title && (
            <div className={prefix + '-header'}>
              <h4 className={prefix + '-title'}>{props.title}</h4>
            </div>
          )}
          {props.children}
        </div>
      </div>
    </Animation>
  );

  if (props.escapeClosable) {
    modal = (
      <Hotkey
        active={visibility}
        hotkeys={[{ key: 27 }]}
        onTrigger={handleClose}>
        {modal}
      </Hotkey>
    );
  }

  return ReactDOM.createPortal(modal, document.body);
}

function ModalBody(props: ModalBodyProps) {
  const cls = component.getComponentClasses('modal-body', props);
  return (
    <div className={cls} style={props.style}>
      {props.children}
    </div>
  );
}

function ModalFooter(props: ModalFooterProps) {
  const cls = component.getComponentClasses('modal-footer', props);
  return (
    <div className={cls} style={props.style}>
      {props.children}
    </div>
  );
}

Modal.defaultProps = defaultProps;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
