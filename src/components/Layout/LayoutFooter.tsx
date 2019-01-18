import React from 'react';

import * as component from '../component';

export interface LayoutFooterProps extends component.ComponentBase {}

const defaultProps: Partial<LayoutFooterProps> = {};

function LayoutFooter(props: LayoutFooterProps) {
  const cls = component.getComponentClasses('layout-footer', props);
  return <div className={cls} />;
}

LayoutFooter.defaultProps = defaultProps;

export default LayoutFooter;
