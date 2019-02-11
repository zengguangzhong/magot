import React from 'react';

import Radio, { RadioValue, RadioProps } from '../Radio';
import * as component from '../component';

import './RadioGroup.less';

export interface RadioOption {
  id?: string;
  label?: string;
  value?: RadioValue;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends component.BaseComponent,
    component.DisableComponent {
  /**
   * 原生表单name属性
   */
  name?: string;

  /**
   * 当前选中的值，只能单选
   */
  value?: RadioValue;

  /**
   * 单选按钮列表数据
   * @default []
   */
  options?: RadioOption[];

  /**
   * 单选按钮组件列表，与`options`互斥，只能二选一，优先使用`children`
   */
  children?: Array<React.ReactElement<RadioProps>>;

  /**
   * 选中值发生变化时的回调函数
   */
  onChange?: (value?: RadioValue) => void;
}

const defaultProps: Partial<RadioGroupProps> = {
  ...component.getDefaultDisabledProps(),
  options: [],
};

function RadioGroup(props: RadioGroupProps) {
  let children = props.children;
  const { options = [], disabled, onChange } = props;
  const cls = component.getComponentClasses('radio-group', props);

  const [value, setValue] = React.useState(props.value);

  const handleItemChange = (val: RadioValue = '') => {
    if (val !== value) {
      setValue(val);
      onChange && onChange(val);
    }
  };

  if (children) {
    children = React.Children.toArray(children).map(child => {
      let radioProps: Partial<RadioProps> = {
        name: props.name,
        checked: child.props.value === value,
        onChange: handleItemChange,
      };
      if (disabled) radioProps.disabled = disabled;
      return React.cloneElement(child, radioProps);
    });
  } else {
    children = options.map((option, index) => {
      const { label, ...radioProps } = option;
      if (disabled) radioProps.disabled = disabled;
      return (
        <Radio
          key={option.id || '' + index}
          {...radioProps}
          name={props.name}
          checked={option.value === value}
          onChange={handleItemChange}>
          {label}
        </Radio>
      );
    });
  }

  return (
    <div className={cls} style={props.style}>
      {children}
    </div>
  );
}

RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
