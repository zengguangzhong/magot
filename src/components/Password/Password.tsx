import React from 'react';

import InputBase, { InputBaseProps } from '../InputBase';
import * as component from '../component';

import './Password.less';

export interface PasswordProps
  extends InputBaseProps<HTMLInputElement>,
    component.SizedComponent {
  /**
   * 是否可切换密码显示状态
   * @default true
   */
  togglable?: boolean;

  /**
   * 密码显示状态切换后的回调函数
   */
  onVisibilityChange?: (visibility: boolean) => void;
}

const defaultProps: Partial<PasswordProps> = {
  ...component.getDefaultSizedProps(),
  togglable: true,
};

function Password(props: PasswordProps) {
  const [visibility, setVisibility] = React.useState(false);
  const { togglable, onVisibilityChange, ...baseProps } = props;

  const handleToggle = () => {
    if (!togglable) return;
    const newVisibility = !visibility;
    setVisibility(newVisibility);
    onVisibilityChange && onVisibilityChange(newVisibility);
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
