import React, { useState } from 'react';

import './Checkbox.less';

import * as component from '../component';

export interface CheckboxProps
  extends component.ComponentBase,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 当前是否选中，用于受控的Checkbox。
   * 若是非受控的Checkbox，请使用`defaultChecked`属性。
   */
  checked?: boolean;

  /**
   * 初始是否选中，仅用于非受控的Checkbox
   */
  defaultChecked?: boolean;

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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultProps: Partial<CheckboxProps> = {
  ...component.getDefaultDisabledProps(),
};

function Checkbox(props: CheckboxProps) {
  const cls = component.getComponentClasses('checkbox', props);

  const checkedProps =
    'checked' in props ? props.checked : props.defaultChecked;
  const [checked, setChecked] = useState(checkedProps);

  const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <label className={cls}>
      <span className="control">
        <input
          type="checkbox"
          name={props.name}
          value={props.value}
          checked={checked}
          disabled={!!props.disabled}
          onChange={onNativeChange}
        />
      </span>
      {props.children && <span className="text">{props.children}</span>}
    </label>
  );
}

Checkbox.defaultProps = defaultProps;

export default Checkbox;
