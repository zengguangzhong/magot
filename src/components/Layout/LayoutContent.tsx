import React from 'react';

import * as component from '../component';

export interface LayoutContentProps extends component.BaseComponent {}

const defaultProps: Partial<LayoutContentProps> = {};

function LayoutContent(props: LayoutContentProps) {
  const cls = component.getComponentClasses('layout-content', props);
  return <div className={cls} />;
}

LayoutContent.defaultProps = defaultProps;

export default LayoutContent;
