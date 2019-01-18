import React from 'react';

import './Collapse.less';

import * as component from '../component';

export interface CollapseProps extends component.ComponentBase {}

const defaultProps: Partial<CollapseProps> = {};

function Collapse(props: CollapseProps) {
  const cls = component.getComponentClasses('collapse', props);
  return <div className={cls} />;
}

Collapse.defaultProps = defaultProps;

export default Collapse;
