import React from 'react';

import './Rate.less';

import * as component from '../component';

export interface RateProps extends component.BaseComponent {}

const defaultProps: Partial<RateProps> = {};

function Rate(props: RateProps) {
  const cls = component.getComponentClasses('rate', props);
  return <div className={cls} />;
}

Rate.defaultProps = defaultProps;

export default Rate;
