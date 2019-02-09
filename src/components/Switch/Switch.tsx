import React from 'react';

import * as component from '../component';

import './Switch.less';

export interface SwitchProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.SizedComponent {
  /**
   * 是否选中，默认不选中
   * @default false
   */
  checked?: boolean;

  /**
   * 选中时的文案，默认无
   */
  onText?: string | React.ReactNode;

  /**
   * 不选中时的文案，默认无
   */
  offText?: string | React.ReactNode;

  /**
   * 组件名称，即表单元素的name属性
   */
  name?: string;

  /**
   * 切换时的回调函数
   */
  onChange?: (checked: boolean) => void;
}

interface SwitchTextProps {
  checked: boolean;
  onText?: string | React.ReactNode;
  offText?: string | React.ReactNode;
}

const defaultProps: Partial<SwitchProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  checked: false,
};

function Switch(props: SwitchProps) {
  const [checked, setChecked] = React.useState(!!props.checked);

  const type = 'switch';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-checked`]: checked,
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = evt.target.checked;
    if (newChecked !== checked) {
      setChecked(newChecked);
      props.onChange && props.onChange(newChecked);
    }
  };

  return (
    <button
      className={cls}
      type="button"
      disabled={props.disabled}
      style={props.style}>
      <input
        type="checkbox"
        name={props.name}
        checked={checked}
        disabled={props.disabled}
        onChange={handleChange}
      />
      <SwitchText
        checked={checked}
        onText={props.onText}
        offText={props.offText}
      />
    </button>
  );
}

function SwitchText(props: SwitchTextProps) {
  let text = props.checked ? props.onText : props.offText;
  if (!text) return null;
  const cls = component.getComponentClasses('switch-text');
  return <span className={cls}>{text}</span>;
}

Switch.defaultProps = defaultProps;

export default Switch;
