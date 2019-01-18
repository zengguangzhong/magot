import React from 'react';

import './ButtonGroup.less';

import * as component from '../component';
import { ButtonProps } from '../Button/Button';

export interface ButtonGroupProps
  extends component.ComponentBase,
    component.DisableComponent,
    component.SizedComponent,
    component.NestedComponent {
  children: Array<React.ReactElement<ButtonProps>>;
}

const defaultProps: Partial<ButtonGroupProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
};

function ButtonGroup(props: ButtonGroupProps) {
  const cls = component.getComponentClasses('button-group', props);
  const btns = props.children.map((child, index) => {
    return React.cloneElement(child, {
      disabled: props.disabled,
      size: props.size,
      key: index,
    });
  });
  return (
    <div className={cls} style={props.style}>
      {btns}
    </div>
  );
}

ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
