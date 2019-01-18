import React from 'react';

import './Tooltip.less';

import * as component from '../component';

export interface TooltipProps extends component.ComponentBase {}

const defaultProps: Partial<TooltipProps> = {};

function Tooltip(props: TooltipProps) {
  const cls = component.getComponentClasses('tooltip', props);
  return <div className={cls} />;
}

Tooltip.defaultProps = defaultProps;

export default Tooltip;
