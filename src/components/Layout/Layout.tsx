import React from 'react';

import './Layout.less';

import * as component from '../component';

export interface LayoutProps extends component.ComponentBase {}

const defaultProps: Partial<LayoutProps> = {};

function Layout(props: LayoutProps) {
  const cls = component.getComponentClasses('layout', props);
  return <div className={cls} />;
}

Layout.defaultProps = defaultProps;

export default Layout;
