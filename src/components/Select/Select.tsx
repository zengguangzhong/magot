import React from 'react';

import Menu, { MenuItemProps, MenuItemGroupProps } from '../Menu';
import Popup from '../Popup';
import Input from '../Input';
import * as component from '../component';

import './Select.less';

export type SelectChildren =
  | React.FunctionComponentElement<MenuItemProps>
  | React.FunctionComponentElement<MenuItemGroupProps>
  | Array<
      | React.FunctionComponentElement<MenuItemProps>
      | React.FunctionComponentElement<MenuItemGroupProps>
    >;

export interface SelectProps
  extends component.InputFormComponent<HTMLInputElement, React.ReactText>,
    component.NestedComponent {
  /**
   * 指定选择框宽度
   * @default 120
   */
  width?: number;

  /**
   * 是否是多选选择框
   * @default false
   */
  multiple?: boolean;

  /**
   * 是否显示右侧的箭头符号
   * @default true
   */
  showCaret?: boolean;

  /**
   * 选项列表
   */
  children?: SelectChildren;

  /**
   * 当前选中值发生变化后的回调函数
   */
  onChange?: (value: React.ReactText | undefined) => void;
}

const defaultProps: Partial<SelectProps> = {
  readOnly: true,
  width: 120,
  multiple: false,
  showCaret: true,
};

function Select(props: SelectProps) {
  const {
    children,
    className,
    style,
    width,
    defaultValue,
    value,
    showCaret,
    onChange,
    onClear,
    ...formProps
  } = props;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [valueState, setValueState] = React.useState(defaultValue || value);

  const type = 'select';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(
    type,
    { className },
    { opened: menuVisible }
  );

  const handleOptionClick = (option: MenuItemProps) => {
    if (option.value !== valueState) {
      setValueState(option.value);
      onChange && onChange(option.value);
    }
  };

  const handlePopupOpen = () => setMenuVisible(true);
  const handlePopupClose = () => setMenuVisible(false);

  const handleClear = () => {
    setValueState('');
    onChange && onChange('');
    onClear && onClear();
  };

  const trigger = (
    <Input
      {...formProps}
      className={cls}
      style={{ ...style, width: width }}
      icon={showCaret ? 'caret' : undefined}
      value={getLabelByValue(children, valueState)}
      onClear={handleClear}
    />
  );

  const overlay = (
    <Menu
      width={width}
      className={prefix + '-menu'}
      selectable={true}
      selectedValues={valueState !== void 0 ? [valueState] : []}
      onItemClick={handleOptionClick}>
      {children}
    </Menu>
  );

  return (
    <Popup
      className={prefix + '-popup'}
      placement="bottomLeft"
      trigger="click"
      space={2}
      overlay={overlay}
      onOpen={handlePopupOpen}
      onClose={handlePopupClose}>
      {trigger}
    </Popup>
  );
}

function isReactTextChild(children?: React.ReactNode) {
  if (children === void 0) return false;
  return typeof children === 'string' || typeof children === 'number';
}

function getLabelByValue(children?: SelectChildren, value?: React.ReactText) {
  const option = getOptionByValue(children, value);
  if (!option) return '';

  const optionProps = option.props;
  if (optionProps.label !== void 0) return optionProps.label;
  if (isReactTextChild(optionProps.children)) {
    return optionProps.children as React.ReactText;
  }
  return optionProps.value;
}

function getOptionByValue(
  children?: SelectChildren,
  value?: React.ReactText
): React.FunctionComponentElement<MenuItemProps> | null {
  if (!children || value === void 0) return null;

  for (const option of React.Children.toArray(children)) {
    if ('items' in option.props) {
      const children = option.props.children as SelectChildren;
      const childOption = getOptionByValue(children, value);
      if (childOption) return childOption;
    } else {
      const item = option as React.FunctionComponentElement<MenuItemProps>;
      if (item.props.value === value) return item;
    }
  }

  return null;
}

Select.defaultProps = defaultProps;
Select.Option = Menu.Item;
Select.OptionGroup = Menu.ItemGroup;

export default Select;
