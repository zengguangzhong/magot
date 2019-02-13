import React from 'react';

import Checkbox, { CheckboxProps } from '../Checkbox';
import * as component from '../component';

import './CheckboxGroup.less';

export interface CheckboxOption {
  id?: string;
  label?: string;
  value?: React.ReactText;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends component.BaseComponent,
    component.DisableComponent {
  /**
   * 原生表单name属性
   */
  name?: string;

  /**
   * 当前选中的值，只能单选
   */
  value?: React.ReactText[];

  /**
   * 复选按钮列表数据
   * @default []
   */
  options?: CheckboxOption[];

  /**
   * 复选按钮组件列表，与`options`互斥，只能二选一，优先使用`children`
   */
  children?: Array<React.ReactElement<CheckboxProps>>;

  /**
   * 选中值发生变化时的回调函数
   */
  onChange?: (value: React.ReactText[]) => void;
}

const defaultProps: Partial<CheckboxGroupProps> = {
  ...component.getDefaultDisabledProps(),
  options: [],
};

function CheckboxGroup(props: CheckboxGroupProps) {
  let children = props.children;
  const { options = [], disabled, onChange } = props;
  const cls = component.getComponentClasses('checkbox-group', props);

  const [value, setValue] = React.useState(props.value || []);

  const isChecked = (val?: React.ReactText) => {
    return val !== void 0 && value.includes(val);
  };

  const handleItemChange = (checked: boolean, val: React.ReactText = '') => {
    let newValue;
    if (checked) {
      newValue = [...value, val];
    } else {
      newValue = value.filter(v => v !== val);
    }
    setValue(newValue);
    onChange && onChange(newValue);
  };

  if (children) {
    children = React.Children.toArray(children).map(child => {
      let checkboxProps: Partial<CheckboxProps> = {
        name: props.name,
        checked: isChecked(child.props.value),
        onChange: handleItemChange,
      };
      if (disabled) checkboxProps.disabled = disabled;
      return React.cloneElement(child, checkboxProps);
    });
  } else {
    children = options.map((option, index) => {
      const { label, ...checkboxProps } = option;
      if (disabled) checkboxProps.disabled = disabled;
      return (
        <Checkbox
          key={option.id || '' + index}
          {...checkboxProps}
          name={props.name}
          checked={isChecked(option.value)}
          onChange={handleItemChange}>
          {label}
        </Checkbox>
      );
    });
  }

  return (
    <div className={cls} style={props.style}>
      {children}
    </div>
  );
}

CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
