import React from 'react';

import './Breadcrumb.less';

import * as component from '../component';

export interface BreadcrumbProps extends component.ComponentBase {}

const defaultProps: Partial<BreadcrumbProps> = {};

function Breadcrumb(props: BreadcrumbProps) {
  const cls = component.getComponentClasses('breadcrumb', props);
  return <div className={cls} />;
}

Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
