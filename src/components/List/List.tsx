import React from 'react';

import './List.less';

import * as component from '../component';

export interface ListProps extends component.BaseComponent {}

const defaultProps: Partial<ListProps> = {};

function List(props: ListProps) {
  const cls = component.getComponentClasses('list', props);
  return <div className={cls} />;
}

List.defaultProps = defaultProps;

export default List;
