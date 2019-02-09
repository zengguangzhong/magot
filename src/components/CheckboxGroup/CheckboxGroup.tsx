import React from 'react';

import Checkbox, { CheckboxValue } from '../Checkbox';
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
  onChange?: (checkedValues: CheckboxValue[]) => void;
}

const defaultProps: Partial<CheckboxGroupProps> = {
  ...component.getDefaultDisabledProps(),
  options: [],
};

function CheckboxGroup(props: CheckboxGroupProps) {
  const { options = [], disabled, onChange } = props;
  const cls = component.getComponentClasses('checkbox-group', props);

  const checked = options.filter(opt => !!opt.checked).map(opt => opt.value);
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

  return (
    <div className={cls} style={props.style}>
      {options.map((option, index) => {
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
      })}
    </div>
  );
}

CheckboxGroup.defaultProps = defaultProps;

export default CheckboxGroup;
