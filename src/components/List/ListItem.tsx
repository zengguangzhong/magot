import React from 'react';

import * as component from '../component';

export interface ListItemProps extends component.ComponentBase {}

const defaultProps: Partial<ListItemProps> = {};

function ListItem(props: ListItemProps) {
  const cls = component.getComponentClasses('list-item', props);
  return <div className={cls} />;
}

ListItem.defaultProps = defaultProps;

export default ListItem;
