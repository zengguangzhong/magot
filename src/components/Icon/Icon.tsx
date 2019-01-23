import React from 'react';

import './Icon.less';

import * as component from '../component';

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

  /**
   * 图标大小，即iconfont的font-size值
   */
  size?: number;
}

const defaultProps: Partial<IconProps> = {
  spin: false,
};

function Icon(props: IconProps) {
  const type = 'icon';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(
    type,
    { ...props, size: 'normal' },
    `${prefix}-${props.name}`,
    {
      spin: !!props.spin,
    }
  );
  return <i className={cls} style={{ ...props.style, fontSize: props.size }} />;
}

Icon.defaultProps = defaultProps;

export default Icon;
