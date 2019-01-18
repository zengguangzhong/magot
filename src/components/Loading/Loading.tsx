import React from 'react';

import './Loading.less';

import * as component from '../component';

export interface LoadingProps extends component.ComponentBase {}

const defaultProps: Partial<LoadingProps> = {};

function Loading(props: LoadingProps) {
  const cls = component.getComponentClasses('loading', props);
  return <div className={cls} />;
}

Loading.defaultProps = defaultProps;

export default Loading;
