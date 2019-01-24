import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

import './Toast.less';

import Icon from '../Icon';
import Button from '../Button';
import * as component from '../component';
import { useTimingToggle } from '../../hooks/visible';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps extends component.BaseComponent {
  container?: Element | null;

  /**
   * 提示消息文案
   */
  message: string | ReactNode;

  /**
   * 消息类型，可选值：`info`, `success`, `warning`, `error`，默认是`info`。
   * @default info
   */
  type?: ToastType;

  /**
   * 显示时长，当时间到了之后会自动关闭，如果设置为0，则不会自动关闭。单位毫秒，默认3秒。
   * @default 3000
   */
  duration?: number;

  /**
   * 是否显示关闭按钮
   * @default false
   */
  showClose?: boolean;

  /**
   * 关闭时触发的回调函数
   */
  onClose?: () => void;
}

const icons = {
  info: 'info',
  success: 'success',
  warning: 'info',
  error: 'error',
};

const defaultProps: Partial<ToastProps> = {
  type: 'info',
  duration: 3000,
  showClose: false,
};

function Toast(props: ToastProps) {
  const [closed, setClosed] = useState(false);
  const visible = useTimingToggle(true, props.duration, closed);

  if (closed || !visible) {
    props.onClose && props.onClose();
    return null;
  }

  const type = 'toast';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-${props.type}`]: !!props.type,
  });

  const onClose = () => setClosed(true);

  return ReactDOM.createPortal(
    <div className={cls} style={props.style}>
      <span className="icon">
        <Icon name={icons[props.type || 'info']} />
      </span>
      <div className="msg">{props.message}</div>
      {props.showClose && (
        <Button icon="close" square={true} onClick={onClose} />
      )}
    </div>,
    props.container || document.body
  );
}

Toast.defaultProps = defaultProps;

function createToastRoot() {
  let root = document.body.querySelector('.mgt-toast-root');
  if (root === null) {
    root = document.createElement('div');
    root.className = 'mgt-toast-root';
    document.body.appendChild(root);
  }
  return root;
}

function create(props: ToastProps) {
  const root = createToastRoot();
  const div = document.createElement('div');
  return ReactDOM.render(<Toast {...props} container={root} />, div);
}

Toast.info = function(
  message: string | ReactNode,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void
) {
  return create({ type: 'info', message, duration, showClose, onClose });
};

Toast.success = function(
  message: string | ReactNode,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void
) {
  return create({ type: 'success', message, duration, showClose, onClose });
};

Toast.warning = function(
  message: string | ReactNode,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void
) {
  return create({ type: 'warning', message, duration, showClose, onClose });
};

Toast.error = function(
  message: string | ReactNode,
  duration?: number,
  showClose?: boolean,
  onClose?: () => void
) {
  return create({ type: 'error', message, duration, showClose, onClose });
};

export default Toast;
