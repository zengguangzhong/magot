import React from 'react';

import './Tree.less';

import * as component from '../component';

export interface TreeProps extends component.BaseComponent {}

const defaultProps: Partial<TreeProps> = {};

function Tree(props: TreeProps) {
  const cls = component.getComponentClasses('tree', props);
  return <div className={cls} />;
}

Tree.defaultProps = defaultProps;

export default Tree;
