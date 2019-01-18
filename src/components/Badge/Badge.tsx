import React from 'react';

import './Badge.less';

import * as component from '../component';

export interface BadgeProps extends component.ComponentBase {}

const defaultProps: Partial<BadgeProps> = {};

function Badge(props: BadgeProps) {
  const cls = component.getComponentClasses('badge', props);
  return <div className={cls} />;
}

Badge.defaultProps = defaultProps;

export default Badge;
