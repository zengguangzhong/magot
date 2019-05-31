import React from 'react';
import cx from 'classnames';

import * as component from '../component';

import './Empty.less';

export interface EmptyProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 设置自定义图片地址，默认是Magot的本地图片
   */
  image?: string;

  /**
   * 自定义图片样式
   */
  imageStyle?: React.CSSProperties;

  /**
   * 是否显示图片
   * @default true
   */
  imageVisible?: boolean;

  /**
   * 提示文案
   * @default 暂无数据
   */
  tips?: string | React.ReactNode;

  /**
   * 自定义提示文案样式
   */
  tipsStyle?: React.CSSProperties;
}

const defaultProps: Partial<EmptyProps> = {
  image: require('./empty.png'),
  imageVisible: true,
  tips: '暂无数据',
};

function Empty(props: EmptyProps) {
  const prefix = component.getComponentPrefix('empty');
  const cls = component.getComponentClasses('empty', props);
  return (
    <div className={cls} style={props.style}>
      {props.imageVisible && props.image && (
        <div
          className={cx(prefix + '-image', {
            'only-empty': !props.tips && !props.children,
          })}
          style={props.imageStyle}>
          <img src={props.image} alt="NO-DATA" />
        </div>
      )}
      {props.tips && (
        <p className={prefix + '-tips'} style={props.tipsStyle}>
          {props.tips}
        </p>
      )}
      {props.children}
    </div>
  );
}

Empty.defaultProps = defaultProps;

export default Empty;
