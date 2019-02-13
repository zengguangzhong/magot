import React from 'react';

import './Radio.less';

import RadioButton from './RadioButton';
import RadioGroup from '../RadioGroup';
import * as component from '../component';

export interface RadioProps
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

  /**
   * 当选中时的回调函数，仅在checked时才会触发
   */
  onChange?: (
    value: React.ReactText | undefined,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const defaultProps: Partial<RadioProps> = {
  ...component.getDefaultDisabledProps(),
  defaultChecked: false,
};

function Radio(props: RadioProps) {
  const isControlled = 'checked' in props;
  const { children, className, style, onChange, ...formProps } = props;

  const type = 'radio';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(props.value, e);
  };

  return (
    <label className={cls} style={style}>
      <input
        {...formProps}
        type="radio"
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

Radio.defaultProps = defaultProps;
Radio.Button = RadioButton;
Radio.Group = RadioGroup;

export default Radio;
