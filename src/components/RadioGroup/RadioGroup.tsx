import React from 'react';

import Radio, { RadioProps } from '../Radio';
import RadioButton, { RadioButtonProps } from '../Radio/RadioButton';
import * as component from '../component';

import './RadioGroup.less';

export interface RadioOption {
  id?: string;
  label?: string;
  value?: React.ReactText;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.SizedComponent {
  /**
   * 原生表单name属性
   */
  name?: string;

  /**
   * 当前选中的值，只能单选
   */
  value?: React.ReactText;

  /**
   * 单选按钮列表数据
   * @default []
   */
  options?: RadioOption[];

  /**
   * 单选按钮组件列表，与`options`互斥，只能二选一，优先使用`children`
   */
  children?: React.ReactElement<RadioProps | RadioButtonProps>[];

  /**
   * 是否渲染为按钮模式，
   * 当通过`options`传递单选列表数据时，可以通过此属性控制渲染模式
   * @default false
   */
  isButtonMode?: boolean;

  /**
   * 选中值发生变化时的回调函数
   */
  onChange?: (value?: React.ReactText) => void;
}

const defaultProps: Partial<RadioGroupProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  options: [],
  isButtonMode: false,
};

function RadioGroup(props: RadioGroupProps) {
  const [value, setValue] = React.useState(props.value);
  const { options = [], isButtonMode, disabled, onChange } = props;

  const handleItemChange = (val: React.ReactText = '') => {
    if (val !== value) {
      setValue(val);
      onChange && onChange(val);
    }
  };

  const renderRadioByChildren = (
    child: React.ReactElement<RadioProps | RadioButtonProps>
  ) => {
    let radioProps: Partial<RadioProps | RadioButtonProps> = {
      name: props.name,
      checked: child.props.value === value,
      size: props.size,
      onChange: handleItemChange,
    };
    if (disabled) radioProps.disabled = disabled;
    return React.cloneElement(child, radioProps);
  };

  const renderRadioByOptions = (option: RadioOption, index: number) => {
    const { label, ...otherProps } = option;
    if (disabled) otherProps.disabled = disabled;
    const radioProps: (Partial<RadioProps | RadioButtonProps>) & {
      key: React.Key;
    } = {
      ...otherProps,
      key: option.id || '' + index,
      name: props.name,
      checked: option.value === value,
      size: isButtonMode ? props.size : undefined,
      onChange: handleItemChange,
    };
    const Element = !isButtonMode ? Radio : RadioButton;
    return React.createElement(Element, radioProps, label);
  };

  const cls = component.getComponentClasses('radio-group', props);
  return (
    <div className={cls} style={props.style}>
      {props.children
        ? React.Children.toArray(props.children).map(renderRadioByChildren)
        : options.map(renderRadioByOptions)}
    </div>
  );
}

RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
