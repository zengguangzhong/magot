import React from 'react';

import './Toast.less';

import * as component from '../component';

export interface ToastProps extends component.ComponentBase {}

const defaultProps: Partial<ToastProps> = {};

function Toast(props: ToastProps) {
  const cls = component.getComponentClasses('toast', props);
  return <div className={cls} />;
}

Toast.defaultProps = defaultProps;

export default Toast;
