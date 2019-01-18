import React from 'react';

import './Avatar.less';

import * as component from '../component';

export interface AvatarProps extends component.ComponentBase {}

const defaultProps: Partial<AvatarProps> = {};

function Avatar(props: AvatarProps) {
  const cls = component.getComponentClasses('avatar', props);
  return <div className={cls} />;
}

Avatar.defaultProps = defaultProps;

export default Avatar;
