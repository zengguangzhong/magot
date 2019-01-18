import React from 'react';

import * as component from '../component';

export interface LayoutContentProps extends component.ComponentBase {}

const defaultProps: Partial<LayoutContentProps> = {};

function LayoutContent(props: LayoutContentProps) {
  const cls = component.getComponentClasses('layout-content', props);
  return <div className={cls} />;
}

LayoutContent.defaultProps = defaultProps;

export default LayoutContent;
