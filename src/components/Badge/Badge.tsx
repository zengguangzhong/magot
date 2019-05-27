import React from 'react';

import './Badge.less';

import * as component from '../component';

export interface BadgeProps
  extends component.BaseComponent,
    component.NestedComponent {
  count?: number;
  max?: number;
  dot?: boolean;
}

const defaultProps: Partial<BadgeProps> = {
  count: 0,
  max: 99,
  dot: false,
};

function getDisplayCount(count: number, max: number) {
  if (count <= max) return '' + count;
  return max + '+';
}

function Badge(props: BadgeProps) {
  const type = 'badge';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [prefix + '-empty']: !props.children,
  });
  return (
    <div className={cls}>
      {props.children}
      {props.count! > 0 && (
        <sup
          className={prefix + (props.dot ? '-dot' : '-count')}
          title={'' + props.count}
          style={props.style}>
          {props.dot ? '' : getDisplayCount(props.count!, props.max!)}
        </sup>
      )}
    </div>
  );
}

Badge.defaultProps = defaultProps;

export default Badge;
