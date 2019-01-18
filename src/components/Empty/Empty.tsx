import React from 'react';

import './Empty.less';

import * as component from '../component';

export interface EmptyProps extends component.ComponentBase {}

const defaultProps: Partial<EmptyProps> = {};

function Empty(props: EmptyProps) {
  const cls = component.getComponentClasses('empty', props);
  return <div className={cls} />;
}

Empty.defaultProps = defaultProps;

export default Empty;
