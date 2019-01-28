import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

import Icon from '../Icon';
import Button from '../Button';
import * as component from '../component';
import { useTimingToggle } from '../../hooks/timer';

import './Toast.less';

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
  closable?: boolean;

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
  closable: false,
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
      {props.closable && (
        <Button icon="close" square={true} onClick={onClose} />
      )}
    </div>,
    props.container || document.body
  );
}

Toast.defaultProps = defaultProps;

function createToastRoot() {
  const prefix = component.getComponentPrefix('toast');
  const cls = prefix + '-root';
  let root = document.body.querySelector('.' + cls);
  if (root === null) {
    root = document.createElement('div');
    root.className = cls;
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
  closable?: boolean,
  onClose?: () => void
) {
  return create({ type: 'info', message, duration, closable, onClose });
};

Toast.success = function(
  message: string | ReactNode,
  duration?: number,
  closable?: boolean,
  onClose?: () => void
) {
  return create({ type: 'success', message, duration, closable, onClose });
};

Toast.warning = function(
  message: string | ReactNode,
  duration?: number,
  closable?: boolean,
  onClose?: () => void
) {
  return create({ type: 'warning', message, duration, closable, onClose });
};

Toast.error = function(
  message: string | ReactNode,
  duration?: number,
  closable?: boolean,
  onClose?: () => void
) {
  return create({ type: 'error', message, duration, closable, onClose });
};

export default Toast;
