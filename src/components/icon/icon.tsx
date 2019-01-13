import React from 'react';

import './icon.less';

import * as component from '../component';
import COMPONENT_TYPE from '../../constants/component-type';

export interface IconProps extends component.ComponentBase {
  /**
   * 图标名称，即iconfont中的图标名
   */
  name: string;

  /**
   * 是否旋转图标
   * @default false
   */
  spin?: boolean;
}

const defaultProps: Partial<IconProps> = {
  spin: false,
};

function Icon(props: IconProps) {
  const prefix = component.getComponentPrefix(COMPONENT_TYPE.ICON);
  const cls = component.getComponentClasses(
    COMPONENT_TYPE.ICON,
    props,
    `${prefix}-${props.name}`,
    {
      spin: !!props.spin,
    }
  );
  return <i className={cls} style={props.style} />;
}

Icon.defaultProps = defaultProps;

export default Icon;
