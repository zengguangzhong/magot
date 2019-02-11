import React from 'react';

import './Radio.less';

import RadioButton from './RadioButton';
import RadioGroup from '../RadioGroup';
import * as component from '../component';

export interface RadioProps
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
   * 当选中时的回调函数，仅在checked时才会触发
   */
  onChange?: (value?: string | number) => void;
}

const defaultProps: Partial<RadioProps> = {
  ...component.getDefaultDisabledProps(),
  defaultChecked: false,
};

function Radio(props: RadioProps) {
  const type = 'radio';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const isControlled = 'checked' in props;
  const handleChange = () => {
    props.onChange && props.onChange(props.value);
  };

  return (
    <label className={cls}>
      <input
        className={prefix + '-native-control'}
        type="radio"
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

Radio.defaultProps = defaultProps;
Radio.Button = RadioButton;
Radio.Group = RadioGroup;

export default Radio;
