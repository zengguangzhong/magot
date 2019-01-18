import React from 'react';

import * as component from '../component';

export interface LayoutHeaderProps extends component.ComponentBase {}

const defaultProps: Partial<LayoutHeaderProps> = {};

function LayoutHeader(props: LayoutHeaderProps) {
  const cls = component.getComponentClasses('layout-header', props);
  return <div className={cls} />;
}

LayoutHeader.defaultProps = defaultProps;

export default LayoutHeader;
