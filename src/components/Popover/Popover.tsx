import React from 'react';

import './Popover.less';

import * as component from '../component';

export interface PopoverProps extends component.BaseComponent {}

const defaultProps: Partial<PopoverProps> = {};

function Popover(props: PopoverProps) {
  const cls = component.getComponentClasses('popover', props);
  return <div className={cls} />;
}

Popover.defaultProps = defaultProps;

export default Popover;
