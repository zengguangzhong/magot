import React from 'react';

import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem';
import * as component from '../component';

import './Breadcrumb.less';

export interface BreadcrumbProps extends component.BaseComponent {
  /**
   * 分隔符，默认`/`
   * @default /
   */
  separator?: string;

  /**
   * 面包屑选项列表
   * @default []
   */
  children: Array<React.ReactElement<BreadcrumbItemProps>>;
}

const defaultProps: Partial<BreadcrumbProps> = {
  separator: '/',
  children: [],
};

function Breadcrumb(props: BreadcrumbProps) {
  const cls = component.getComponentClasses('breadcrumb', props);
  return (
    <ul className={cls} style={props.style}>
      {props.children.map((item, index) => {
        return React.cloneElement(item, {
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
