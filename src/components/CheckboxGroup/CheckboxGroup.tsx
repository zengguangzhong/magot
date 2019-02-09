import React from 'react';

import Checkbox, { CheckboxValue, CheckboxProps } from '../Checkbox';
import * as component from '../component';

import './CheckboxGroup.less';

export interface CheckboxOption {
  label: string;
  value: CheckboxValue;
  id?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface CheckboxGroupProps
  extends component.BaseComponent,
    component.DisableComponent {
  options?: CheckboxOption[];
  children?: Array<React.ReactElement<CheckboxProps>>;
  onChange?: (checkedValues: CheckboxValue[]) => void;
}

const defaultProps: Partial<CheckboxGroupProps> = {
  ...component.getDefaultDisabledProps(),
  options: [],
};

function CheckboxGroup(props: CheckboxGroupProps) {
  let children = props.children;
  const { options = [], disabled, onChange } = props;
  const cls = component.getComponentClasses('checkbox-group', props);

  const checked = getCheckedValues(options, children);
  const [checkedValues, setCheckedValues] = React.useState(checked);

  const handleItemChange = (checked: boolean, value: CheckboxValue = '') => {
    let newCheckedValues;
    if (checked) {
      newCheckedValues = [...checkedValues, value];
    } else {
      newCheckedValues = checkedValues.filter(val => val !== value);
    }
    setCheckedValues(newCheckedValues);
    onChange && onChange(newCheckedValues);
  };

  if (children) {
    children = React.Children.toArray(children).map(child => {
      let props: Partial<CheckboxProps> = { onChange: handleItemChange };
      if (disabled) props.disabled = disabled;
      return React.cloneElement(child, props);
    });
  } else {
    children = options.map((option, index) => {
      const { label, ...checkboxProps } = option;
      if (disabled) checkboxProps.disabled = disabled;
      return (
        <Checkbox
          key={option.id || '' + index}
          {...checkboxProps}
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

function getCheckedValues(
  options?: CheckboxOption[],
  children?: Array<React.ReactElement<CheckboxProps>>
) {
  if (children) {
    return (children || [])
      .filter(child => !!child.props.checked)
      .map(child => child.props.value || '');
  }
  return (options || []).filter(opt => !!opt.checked).map(opt => opt.value);
}

CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
