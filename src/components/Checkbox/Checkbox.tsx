import React from 'react';

import CheckboxGroup from '../CheckboxGroup';
import * as component from '../component';

import './Checkbox.less';

export interface CheckboxProps
  extends component.BaseComponent,
    component.DisableComponent,
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

  /**
   * 原生表单name属性
   */
  name?: string;

  /**
   * 原生表单value属性
   */
  value?: string | number;

  /**
   * 选中或反选时的回调函数
   */
  onChange?: (checked: boolean, value?: string | number) => void;
}

const defaultProps: Partial<CheckboxProps> = {
  ...component.getDefaultDisabledProps(),
  defaultChecked: false,
};

function Checkbox(props: CheckboxProps) {
  const type = 'checkbox';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const isControlled = 'checked' in props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e.target.checked, props.value);
  };

  return (
    <label className={cls}>
      <input
        className={prefix + '-native-control'}
        type="checkbox"
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        checked={isControlled ? props.checked : undefined}
        defaultChecked={!isControlled ? props.defaultChecked : undefined}
        onChange={handleChange}
      />
      <span className={prefix + '-control'} />
      {props.children && (
        <span className={prefix + '-text'}>{props.children}</span>
      )}
    </label>
  );
}

Checkbox.defaultProps = defaultProps;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
