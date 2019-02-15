import React from 'react';
import cx from 'classnames';

import MenuContext from './MenuContext';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './MenuItem.less';

export interface MenuItemProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent,
    component.IconableComponent {
  /**
   * 选项标签
   */
  label?: React.ReactText;

  /**
   * 菜单项内容值
   */
  value?: React.ReactText;
}

const defaultProps: Partial<MenuItemProps> = {
  ...component.getDefaultDisabledProps(),
};

function MenuItem(props: MenuItemProps) {
  const { label, value, children, disabled } = props;
  const cls = component.getComponentClasses('menu-item', props);
  const cel = children !== void 0 ? children : label !== void 0 ? label : value;
  return (
    <MenuContext.Consumer>
      {ctx => {
        let selected = false;
        if (ctx && ctx.selectable && !disabled && value !== void 0) {
          const selectedValues = (ctx && ctx.selectedValues) || [];
          selected = selectedValues.includes(value);
        }

        const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
          ctx && ctx.onItemClick && ctx.onItemClick(props, e);
        };

        return (
          <li
            className={cx(cls, { selected })}
            style={props.style}
            onClick={handleClick}>
            <Iconable
              name={props.icon}
              position={props.iconPosition}
              size={props.iconSize}>
              {cel}
            </Iconable>
          </li>
        );
      }}
    </MenuContext.Consumer>
  );
}

MenuItem.defaultProps = defaultProps;

export default MenuItem;
