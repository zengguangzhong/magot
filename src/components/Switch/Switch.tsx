import React from 'react';

import * as component from '../component';

import './Switch.less';

export interface SwitchProps
  extends component.FormComponent<HTMLInputElement>,
    component.SizedComponent {
  /**
   * 是否选中，默认不选中
   * @default false
   */
  checked?: boolean;

  defaultValue?: string;

  /**
   * 选中时的文案，默认无
   */
  onText?: string | React.ReactNode;

  /**
   * 不选中时的文案，默认无
   */
  offText?: string | React.ReactNode;

  /**
   * 切换时的回调函数
   */
  onChange?: (
    checked: boolean,
    value: React.ReactText | undefined,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
  const {
    className,
    style,
    size,
    onText,
    offText,
    onChange,
    ...formProps
  } = props;

  const [checked, setChecked] = React.useState(!!props.checked);

  const type = 'switch';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-checked`]: checked,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (newChecked !== checked) {
      setChecked(newChecked);
      onChange && onChange(newChecked, props.value, e);
    }
  };

  return (
    <button
      className={cls}
      type="button"
      disabled={props.disabled}
      style={style}>
      <input
        {...formProps}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <SwitchText checked={checked} onText={onText} offText={offText} />
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
