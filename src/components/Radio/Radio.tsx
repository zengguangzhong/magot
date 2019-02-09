import React from 'react';

import './Radio.less';

import RadioGroup from '../RadioGroup';
import * as component from '../component';

export type RadioValue = string | string[] | number;

export interface RadioProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 当前是否选中，默认不选中
   * @default false
   */
  checked?: boolean;

  /**
   * 原生表单name属性
   */
  name?: string;

  /**
   * 原生表单value属性
   */
  value?: RadioValue;
}

const defaultProps: Partial<RadioProps> = {
  ...component.getDefaultDisabledProps(),
  checked: false,
};

function Radio(props: RadioProps) {
  const [checked, setChecked] = React.useState(!!props.checked);

  const type = 'radio';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-checked`]: checked,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (newChecked !== checked) {
      setChecked(newChecked);
    }
  };

  return (
    <label className={cls}>
      <span className={prefix + '-control'}>
        <input
          type="radio"
          name={props.name}
          value={props.value}
          checked={checked}
          disabled={!!props.disabled}
          onChange={handleChange}
        />
      </span>
      {props.children && (
        <span className={prefix + '-text'}>{props.children}</span>
      )}
    </label>
  );
}

Radio.defaultProps = defaultProps;
Radio.Group = RadioGroup;

export default Radio;
