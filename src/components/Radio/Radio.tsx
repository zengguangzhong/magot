import React from 'react';

import './Radio.less';

import * as component from '../component';

export interface RadioProps extends component.BaseComponent {}

const defaultProps: Partial<RadioProps> = {};

function Radio(props: RadioProps) {
  const cls = component.getComponentClasses('radio', props);
  return <div className={cls} />;
}

Radio.defaultProps = defaultProps;

export default Radio;
