import React from 'react';

import BreadcrumbItem from './BreadcrumbItem';
import * as component from '../component';

import './Breadcrumb.less';

export interface BreadcrumbProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 分隔符，默认`/`
   * @default /
   */
  separator?: string;
}

const defaultProps: Partial<BreadcrumbProps> = {
  separator: '/',
};

function Breadcrumb(props: BreadcrumbProps) {
  const cls = component.getComponentClasses('breadcrumb', props);
  const items = React.Children.toArray(props.children);
  return (
    <ul className={cls}>
      {items.map((item, index) => {
        return React.cloneElement(React.Children.only(item), {
          key: index,
          separator: props.separator,
        });
      })}
    </ul>
  );
}

Breadcrumb.defaultProps = defaultProps;
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
