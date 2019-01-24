import React from 'react';

import * as component from '../component';

export interface TableRowProps extends component.BaseComponent {}

const defaultProps: Partial<TableRowProps> = {};

function TableRow(props: TableRowProps) {
  const cls = component.getComponentClasses('table-row', props);
  return <div className={cls} />;
}

TableRow.defaultProps = defaultProps;

export default TableRow;
