import React from 'react';

import './Qrcode.less';

import * as component from '../component';

export interface QrcodeProps extends component.ComponentBase {}

const defaultProps: Partial<QrcodeProps> = {};

function Qrcode(props: QrcodeProps) {
  const cls = component.getComponentClasses('qrcode', props);
  return <div className={cls} />;
}

Qrcode.defaultProps = defaultProps;

export default Qrcode;
