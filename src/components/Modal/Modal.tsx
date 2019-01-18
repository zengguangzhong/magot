import React from 'react';

import './Modal.less';

import * as component from '../component';

export interface ModalProps extends component.ComponentBase {}

const defaultProps: Partial<ModalProps> = {};

function Modal(props: ModalProps) {
  const cls = component.getComponentClasses('modal', props);
  return <div className={cls} />;
}

Modal.defaultProps = defaultProps;

export default Modal;
