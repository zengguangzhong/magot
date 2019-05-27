import React from 'react';
import Icon from '../Icon';
import * as component from '../component';
import { getShallowTextSize } from '../../utils/node';

import './Avatar.less';

export interface AvatarProps
  extends component.BaseComponent,
    component.SizedComponent {
  /**
   * 图片头像的图片地址
   */
  src?: string;

  /**
   * 多图适配的图片地址，仅适用于图片头像
   */
  srcset?: string;

  /**
   * 当图片加载失败时的占位文案，仅适用于图片头像
   */
  alt?: string;

  /**
   * 文字头像的文字内容
   */
  text?: string;

  /**
   * 图标头像的图标名
   * @default user
   */
  icon?: string;

  /**
   * 头像的圆角，默认全圆角
   * @default 50%
   */
  radius?: number | string;
}

const defaultProps: Partial<AvatarProps> = {
  ...component.getDefaultSizedProps(),
  icon: 'user',
  radius: '50%',
};

function Avatar(props: AvatarProps) {
  let children;
  let isImageAvatar = false;
  let isTextAvatar = false;
  let isIconAvatar = false;

  if (props.src) {
    isImageAvatar = true;
    children = <AvatarImage {...props} />;
  } else if (props.text) {
    isTextAvatar = true;
    children = <AvatarText {...props} text={props.text} />;
  } else if (props.icon) {
    isIconAvatar = true;
    children = <Icon className="icon" name={props.icon} />;
  } else {
    children = null;
  }

  const type = 'avatar';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [prefix + '-image']: isImageAvatar,
    [prefix + '-text']: isTextAvatar,
    [prefix + '-icon']: isIconAvatar,
  });

  return (
    <div
      className={cls}
      style={{
        borderRadius: props.radius,
        ...props.style,
      }}>
      {children}
    </div>
  );
}

function AvatarImage(props: AvatarProps) {
  return (
    <img
      className="image"
      src={props.src}
      alt={props.alt}
      srcSet={props.srcset}
    />
  );
}

function AvatarText(props: AvatarProps & { text: string }) {
  const avatarSizes = { small: 24, normal: 32, large: 40 };
  const avatarWidth = avatarSizes[props.size!];
  const { width: textWidth } = getShallowTextSize(props.text);
  const textScale = Math.min(1, (avatarWidth - 6) / textWidth);
  return (
    <span
      className="text"
      style={{ transform: `scale(${textScale}) translateX(-50%)` }}>
      {props.text}
    </span>
  );
}

Avatar.defaultProps = defaultProps;

export default Avatar;
