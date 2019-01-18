import React from 'react';

import './Uploader.less';

import * as component from '../component';

export interface UploaderProps extends component.ComponentBase {}

const defaultProps: Partial<UploaderProps> = {};

function Uploader(props: UploaderProps) {
  const cls = component.getComponentClasses('uploader', props);
  return <div className={cls} />;
}

Uploader.defaultProps = defaultProps;

export default Uploader;
