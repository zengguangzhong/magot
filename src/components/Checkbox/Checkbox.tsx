import React from 'react';

import CheckboxGroup from '../CheckboxGroup';
import * as component from '../component';

import './Checkbox.less';

export interface CheckboxProps
  extends component.FormComponent<HTMLInputElement>,
    component.NestedComponent {
  /**
   * 当前是否选中，用于受控组件，默认不选中
   * @see https://reactjs.org/docs/forms.html?#controlled-components
   * @default false
   */
  checked?: boolean;

  /**
   * 默认是否选中，用于非受控组件
   * @see https://reactjs.org/docs/uncontrolled-components.html
   * @default false
   */
  defaultChecked?: boolean;

  defaultValue?: string;

  /**
   * 选中或反选时的回调函数
   */
  onChange?: (
    checked: boolean,
    value: React.ReactText | undefined,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const defaultProps: Partial<CheckboxProps> = {
  ...component.getDefaultDisabledProps(),
  defaultChecked: false,
};

function Checkbox(props: CheckboxProps) {
  const isControlled = 'checked' in props;
  const { children, className, style, onChange, ...formProps } = props;

  const type = 'checkbox';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked, props.value, e);
  };

  return (
    <label className={cls} style={style}>
      <input
        {...formProps}
        type="checkbox"
        className={prefix + '-native-control'}
        checked={isControlled ? props.checked : undefined}
        defaultChecked={!isControlled ? props.defaultChecked : undefined}
        onChange={handleChange}
      />
      <span className={prefix + '-control'} />
      {children && <span className={prefix + '-text'}>{children}</span>}
    </label>
  );
}

Checkbox.defaultProps = defaultProps;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
