import React from 'react';

import './Table.less';

import * as component from '../component';

export interface TableProps extends component.BaseComponent {}

const defaultProps: Partial<TableProps> = {};

function Table(props: TableProps) {
  const cls = component.getComponentClasses('table', props);
  return <div className={cls} />;
}

Table.defaultProps = defaultProps;

export default Table;
