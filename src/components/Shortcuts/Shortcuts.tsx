import React from 'react';

import './Shortcuts.less';

import * as component from '../component';

export interface ShortcutsProps extends component.ComponentBase {}

const defaultProps: Partial<ShortcutsProps> = {};

function Shortcuts(props: ShortcutsProps) {
  const cls = component.getComponentClasses('shortcuts', props);
  return <div className={cls} />;
}

Shortcuts.defaultProps = defaultProps;

export default Shortcuts;
