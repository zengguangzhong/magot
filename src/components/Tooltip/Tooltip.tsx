import React from 'react';

import Popup from '../Popup';
import * as component from '../component';
import { Alignment } from '../../utils/alignment';

import './Tooltip.less';

export interface TooltipProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 提示文案
   */
  title: string | React.ReactNode;

  /**
   * 气泡位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  align?: Alignment;
}

function Tooltip(props: TooltipProps) {
  const cls = component.getComponentClasses('tooltip', props);
  const tooltip = (
    <div className={cls} style={{ ...props.style }}>
      {props.title}
    </div>
  );
  return (
    <Popup align={props.align} overlay={tooltip}>
      {props.children}
    </Popup>
  );
}

export default Tooltip;
