import React from 'react';
import ReactDOM from 'react-dom';

import './Loading.less';

import Icon from '../Icon';
import * as component from '../component';

export type Diretion = 'row' | 'column';

export interface LoadingProps
  extends component.ComponentBase,
    component.SizedComponent,
    component.NestedComponent {
  /**
   * 是否是全局Loading，将覆盖在整个body之上
   * @default false
   */
  global?: boolean;

  /**
   * 是否正在加载状态，只有在加载状态时，才渲染Loading组件
   * @default true
   */
  loading?: boolean;

  /**
   * 加载提示文案
   */
  tip?: string;

  /**
   * 加载图标与提示文案的布局方向，可选值：row-按行布局，column-按列布局，默认`column`
   * @default column
   */
  direction?: Diretion;
}

const defaultProps: Partial<LoadingProps> = {
  ...component.getDefaultSizedProps(),
  global: false,
  loading: true,
  direction: 'column',
};

function Loading(props: LoadingProps) {
  if (!props.loading) return null;
  if (props.global) {
    return <GlobalLoading {...props} />;
  }
  if (props.children) {
    return <ContainerLoading {...props}>{props.children}</ContainerLoading>;
  }
  return <CommonLoading {...props} />;
}

function CommonLoading(props: LoadingProps) {
  const type = 'loading';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-global`]: !!props.global,
    [`${prefix}-row`]: props.direction === 'row',
  });
  return (
    <div className={cls}>
      <Icon name="loading" spin={true} />
      {props.tip && <p className="tip">{props.tip}</p>}
    </div>
  );
}

function ContainerLoading(props: LoadingProps) {
  return (
    <div className="msg-loading-container">
      <CommonLoading {...props} />
      {props.children}
    </div>
  );
}

function GlobalLoading(props: LoadingProps) {
  return ReactDOM.createPortal(<CommonLoading {...props} />, document.body);
}

Loading.defaultProps = defaultProps;

export default Loading;
