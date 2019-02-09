import React from 'react';

import * as component from '../component';

import './Checkbox.less';

export interface CheckboxProps
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
  value?: string | string[] | number;

  /**
   * 选中或反选时的回调函数
   */
  onChange?: (checked?: boolean) => void;
}

const defaultProps: Partial<CheckboxProps> = {
  ...component.getDefaultDisabledProps(),
  checked: false,
};

function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = React.useState(!!props.checked);

  const type = 'checkbox';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-checked`]: checked,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (newChecked !== checked) {
      setChecked(newChecked);
      props.onChange && props.onChange(newChecked);
    }
  };

  return (
    <label className={cls}>
      <span className={prefix + '-control'}>
        <input
          type="checkbox"
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

Checkbox.defaultProps = defaultProps;

export default Checkbox;
