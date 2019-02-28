import React from 'react';

import InputBase, { InputBaseProps } from '../InputBase';
import * as component from '../component';

import './Password.less';

export interface PasswordProps
  extends InputBaseProps<HTMLInputElement>,
    component.SizedComponent {
  togglable?: boolean;
}

const defaultProps: Partial<PasswordProps> = {
  ...component.getDefaultSizedProps(),
  togglable: true,
};

function Password(props: PasswordProps) {
  const [visibility, setVisibility] = React.useState(false);
  const { togglable, onIconClick, ...baseProps } = props;

  const handleToggle = () => {
    if (!togglable) return;
    setVisibility(!visibility);
    onIconClick && onIconClick();
  };

  const cls = component.getComponentClasses('password', {}, props.className, {
    visibility,
  });
  return (
    <InputBase
      {...baseProps}
      icon={togglable ? 'view' : undefined}
      className={cls}
      onIconClick={handleToggle}>
      <input type={visibility ? 'text' : 'password'} />
    </InputBase>
  );
}

Password.defaultProps = defaultProps;

export default Password;
