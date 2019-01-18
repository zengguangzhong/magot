import React from 'react';

import './Pagination.less';

import * as component from '../component';

export interface PaginationProps extends component.ComponentBase {}

const defaultProps: Partial<PaginationProps> = {};

function Pagination(props: PaginationProps) {
  const cls = component.getComponentClasses('pagination', props);
  return <div className={cls} />;
}

Pagination.defaultProps = defaultProps;

export default Pagination;
