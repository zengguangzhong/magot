import React from 'react';

import * as component from '../component';

export interface BreadcrumbItemProps extends component.BaseComponent {}

const defaultProps: Partial<BreadcrumbItemProps> = {};

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const cls = component.getComponentClasses('breadcrumb-item', props);
  return <div className={cls} />;
}

BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
