import React from 'react';

import './Loader.less';

import * as component from '../component';

export interface LoaderProps extends component.BaseComponent {}

const defaultProps: Partial<LoaderProps> = {};

function Loader(props: LoaderProps) {
  const cls = component.getComponentClasses('loader', props);
  return <div className={cls} />;
}

Loader.defaultProps = defaultProps;

export default Loader;
