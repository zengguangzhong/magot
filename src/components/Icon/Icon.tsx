import React from 'react';

import * as component from '../component';

import './Icon.less';

export interface IconProps extends component.BaseComponent {
  /**
   * 图标名称，即iconfont中的图标名
   */
  name?: string;

  /**
   * 是否旋转图标
   * @default false
   */
  spin?: boolean;

  /**
   * 图标大小，即iconfont的font-size值
   */
  size?: number;

  /**
   * 图标点击后的回调函数
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
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
    {
      [`${prefix}-${props.name}`]: props.name,
      spin: !!props.spin,
    }
  );
  const style: React.CSSProperties = { ...props.style };
  if (props.size) style['fontSize'] = props.size;
  return <i className={cls} style={style} onClick={props.onClick} />;
}

Icon.defaultProps = defaultProps;

export default Icon;
