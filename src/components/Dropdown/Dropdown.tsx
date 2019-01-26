import React from 'react';
import cx from 'classnames';

import './Dropdown.less';

import { MenuProps } from '../Menu';
import Popup, { PopupTrigger } from '../Popup';
import * as component from '../component';
import { Alignment } from '../../utils/alignment';
import Button, { ButtonProps } from 'components/Button';

export interface DropdownProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 下拉菜单对齐位置，可选值：`top`, `bottom, `topLeft`, `topRight`, `bottomLeft`, `bottomRight`，默认`bottomLeft`
   * @default bottomLeft
   */
  align?: Extract<
    Alignment,
    'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  >;

  /**
   * 触发下拉菜单的行为方式，可选值：`hover`, `click`, `contextMenu`，默认`hover`
   * @default hover
   */
  trigger?: PopupTrigger;

  /**
   * 下拉菜单组件(Menu)
   */
  overlay: React.ReactElement<MenuProps>;
}

const defaultProps: Partial<DropdownProps> = {
  ...component.getDefaultDisabledProps(),
  align: 'bottomLeft',
  trigger: 'hover',
};

function Dropdown(props: DropdownProps) {
  const type = 'dropdown';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const dropdown = (
    <div className={cls} style={props.style}>
      {props.overlay}
    </div>
  );

  const children = React.cloneElement(React.Children.only(props.children), {
    disabled: props.disabled,
    className: cx(prefix + '-trigger', {
      [prefix + '-disabled']: !!props.disabled,
    }),
  });

  return (
    <Popup
      align={props.align}
      preventOut={true}
      trigger={props.trigger}
      overlay={dropdown}>
      {children}
    </Popup>
  );
}

function ButtonDropdown(props: DropdownProps & ButtonProps) {
  const {
    align,
    trigger,
    overlay,
    disabled,
    className,
    style,
    ...btnProps
  } = props;
  const button = <Button {...btnProps}>{props.children}</Button>;
  return (
    <Dropdown
      align={align}
      trigger={trigger}
      overlay={overlay}
      disabled={disabled}
      className={className}
      style={style}>
      {button}
    </Dropdown>
  );
}

Dropdown.defaultProps = defaultProps;
Dropdown.Button = ButtonDropdown;

export default Dropdown;
