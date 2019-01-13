import React from 'react';

import './button.less';

import Icon from '../icon';
import ButtonGroup from '../button-group';
import * as component from '../component';
import COMPONENT_TYPE from '../../constants/component-type';

export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'text'
  | 'link';
export type ButtonHTMLType = 'button' | 'submit' | 'reset';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps
  extends component.ComponentBase,
    component.DisableComponent,
    component.SizedComponent,
    component.NestedComponent,
    component.ClickableComponent<HTMLButtonElement | HTMLAnchorElement> {
  /**
   * 是否是全宽按钮，按钮的宽度将被渲染为父组件的宽度
   * @default false
   */
  block?: boolean;

  /**
   * 是否是圆形按钮，适用于纯图标按钮
   * @default false
   */
  circular?: boolean;

  /**
   * 设置倒计时秒数，当此值>0s，即是有倒计时功能的按钮。
   * 当倒计时结束，则触发`onCountdownEnd`回调函数
   */
  // countdown?: number;

  /**
   * 设置`button`原生的`type`值，可选值有: `button`, `submit`, `reset`，默认`button`。
   * @default button
   */
  htmlType?: ButtonHTMLType;

  /**
   * 点击按钮跳转的链接，指定此属性后的行为将和`<a>`链接一致
   */
  href?: string;

  /**
   * 按钮图标
   */
  icon?: string;

  /**
   * 按钮图标位置，可选值有：`left`, `right`，默认`left`。
   * @default left
   */
  iconPosition?: ButtonIconPosition;

  /**
   * 是否是加载中状态
   * @default false
   */
  loading?: boolean;

  /**
   * 是否是方形按钮，宽高相同，但保留圆角，适用于纯图标按钮
   * @default false
   */
  square?: boolean;

  /**
   * 按钮类型，可选值有: `primary`, `success`, `warning`, `danger`, `text`, `link`。
   */
  type?: ButtonType;

  /**
   * 相当于`<a>`链接的`target`属性，仅在指定`href`属性后生效
   */
  target?: string;

  /**
   * 倒计时结束后，将会触发的回调函数
   */
  // onCountdownEnd?: () => void;
}

const defaultProps: Partial<ButtonProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  block: false,
  circular: false,
  htmlType: 'button',
  iconPosition: 'left',
  loading: false,
  square: false,
};

function Button(props: ButtonProps) {
  // const countdown = useCountdown(props.countdown || 0);
  // console.log(countdown);
  return props.href ? renderLink(props) : renderButton(props);
}

// function useCountdown(initialValue: number) {
//   const [countdown, setCountdown] = useState(initialValue);
//   function decreament(d: number) {
//     setCountdown(d - 1);
//   }
//   useEffect(() => {
//     let timer = countdown > 0 ? window.setTimeout(decreament, 1000) : -1;
//     return () => {
//       window.clearTimeout(timer);
//     };
//   });
//   return countdown;
// }

function getClasses(props: ButtonProps) {
  const prefix = component.getComponentPrefix(COMPONENT_TYPE.BUTTON);
  return component.getComponentClasses(COMPONENT_TYPE.BUTTON, props, {
    [`${prefix}-${props.type}`]: !!props.type,
    [`${prefix}-block`]: !!props.block,
    [`${prefix}-circular`]: !!props.circular,
    [`${prefix}-square`]: !!props.square,
  });
}

function renderButton(props: ButtonProps) {
  return (
    <button
      className={getClasses(props)}
      type={props.htmlType}
      disabled={!!props.disabled}
      style={props.style}
      onClick={props.onClick}>
      {renderChildren(props)}
    </button>
  );
}

function renderLink(props: ButtonProps) {
  return (
    <a
      className={getClasses(props)}
      href={props.href}
      target={props.target}
      style={props.style}
      onClick={props.onClick}>
      {renderChildren(props)}
    </a>
  );
}

function renderChildren(props: ButtonProps) {
  // const cd = props.countdown ? `${props.countdown}s ` : '';
  const text = props.children ? (
    <span>
      {/* {cd} */}
      {props.children}
    </span>
  ) : null;
  let icon = props.icon ? <Icon name={props.icon} /> : null;
  if (props.loading) icon = <Icon name="loading" spin={true} />;
  if (props.iconPosition === 'right') {
    return (
      <>
        {text}
        {icon}
      </>
    );
  }
  return (
    <>
      {icon}
      {text}
    </>
  );
}

Button.defaultProps = defaultProps;
Button.Group = ButtonGroup;

export default Button;
