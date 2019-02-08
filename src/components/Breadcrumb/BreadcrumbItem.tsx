import React from 'react';

import Iconable from '../Icon/Iconable';
import * as component from '../component';

export interface BreadcrumbItemProps
  extends component.BaseComponent,
    component.NestedComponent,
    component.IconableComponent {
  separator?: string;
}

const defaultProps: Partial<BreadcrumbItemProps> = {};

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const sp = component.getComponentClasses('breadcrumb-separator');
  const cls = component.getComponentClasses('breadcrumb-item', props);
  return (
    <li className={cls}>
      <Iconable
        name={props.icon}
        position={props.iconPosition}
        size={props.iconSize}>
        {props.children}
      </Iconable>
      <span className={sp}>{props.separator}</span>
    </li>
  );
}

BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
