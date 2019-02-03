import React from 'react';

import Popup, { PopupTrigger } from '../Popup';
import * as component from '../component';
import { Placement } from '../../utils/placement';

import './Popover.less';

export interface PopoverProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 气泡标题
   */
  title?: string | React.ReactNode;

  /**
   * 气泡内容
   */
  content: string | React.ReactNode;

  /**
   * 气泡位置，12个方位，
   * 可选值：`left`,`top`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom`，
   * 默认值是`top`
   * @default top
   */
  placement?: Placement;

  /**
   * 触发气泡的行为方式，可选值：`hover`, `click`，默认`hover`
   * @default hover
   */
  trigger?: Extract<PopupTrigger, 'hover' | 'click'>;
}

const defaultProps: Partial<PopoverProps> = {
  placement: 'top',
  trigger: 'hover',
};

function Popover(props: PopoverProps) {
  const type = 'popover';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);
  const popover = (
    <div className={cls} style={props.style}>
      {props.title && <div className={prefix + '-title'}>{props.title}</div>}
      <div className={prefix + '-content'}>{props.content}</div>
    </div>
  );
  return (
    <Popup
      placement={props.placement}
      preventOut={true}
      clickClosable={false}
      trigger={props.trigger}
      overlay={popover}>
      {props.children}
    </Popup>
  );
}

Popover.defaultProps = defaultProps;

export default Popover;
