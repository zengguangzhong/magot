import React from 'react';

import './ContextMenu.less';

import * as component from '../component';

export interface ContextMenuProps extends component.ComponentBase {}

const defaultProps: Partial<ContextMenuProps> = {};

function ContextMenu(props: ContextMenuProps) {
  const cls = component.getComponentClasses('context-menu', props);
  return <div className={cls} />;
}

ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
