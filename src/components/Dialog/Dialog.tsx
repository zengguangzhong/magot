import React from 'react';
import ReactDOM from 'react-dom';

import Modal, { ModalPlacement } from '../Modal';
import Button, { ButtonType } from '../Button';
import Icon, { IconProps } from '../Icon';
import * as component from '../component';

import './Dialog.less';

export interface DialogProps {
  /**
   * 对话框标题文案
   */
  title: string | React.ReactNode;

  /**
   * 对话框内容文案
   */
  content: string | React.ReactNode;

  /**
   * 自定义图标
   */
  icon?: string | React.ReactElement<IconProps>;

  /**
   * 对话框宽度
   * @default 420
   */
  width?: number;

  /**
   * 对话框位置，可选值：`center`, `top`，默认`center`
   * @default center
   */
  placement?: ModalPlacement;

  /**
   * 是否显示模态遮罩
   * @default true
   */
  mask?: boolean;

  /**
   * 点击模态遮罩是否关闭对话框
   * @default false
   */
  maskClosable?: boolean;

  /**
   * 对话框层级
   * @default 1000
   */
  zIndex?: number;

  /**
   * 确定按钮文本
   * @default 确定
   */
  okText?: string;

  /**
   * 确定按钮类型，同`ButtonType`
   * @default primary
   */
  okType?: ButtonType;

  /**
   * 确定按钮点击回调函数
   */
  onOk?: () => void;
}

export interface ConfirmProps extends DialogProps {
  /**
   * 取消按钮文本
   * @default 取消
   */
  cancelText?: string;

  /**
   * 取消按钮点击回调函数
   */
  onCancel?: () => void;
}

type FullDialogProps = DialogProps & ConfirmProps & { type: string };

const dialogDefaultProps: Partial<DialogProps> = {
  width: 420,
  placement: 'top',
  mask: true,
  maskClosable: false,
  okText: '知道了',
  okType: 'primary',
};

const confirmDefaultProps: Partial<ConfirmProps> = {
  ...dialogDefaultProps,
  icon: 'question',
  okText: '确定',
  cancelText: '取消',
};

function Dialog(props: FullDialogProps) {
  const [visible, setVisible] = React.useState(true);

  const type = 'dialog';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(
    type,
    {},
    `${prefix}-${props.type}`
  );

  const handleOk = () => {
    setVisible(false);
    props.onOk && props.onOk();
  };
  const handleCancel = () => {
    setVisible(false);
    props.onCancel && props.onCancel();
  };

  return (
    <Modal
      className={cls}
      width={props.width}
      visible={visible}
      closable={false}
      escapeClosable={false}
      mask={props.mask}
      maskClosable={props.maskClosable}
      placement={props.placement}
      zIndex={props.zIndex}
      removeWhenClosed={true}>
      <Modal.Body>
        <div className={prefix + '-title'}>
          <DialogIcon icon={props.icon} />
          <span className="text">{props.title}</span>
        </div>
        <div className={prefix + '-content'}>{props.content}</div>
      </Modal.Body>
      <Modal.Footer>
        {props.type === 'confirm' && (
          <Button onClick={handleCancel}>{props.cancelText}</Button>
        )}
        <Button type={props.okType} onClick={handleOk}>
          {props.okText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DialogIcon(props: Pick<DialogProps, 'icon'>) {
  if (typeof props.icon === 'string') {
    return <Icon name={props.icon} />;
  }
  return props.icon || null;
}

function createDialog(props: FullDialogProps) {
  const div = document.createElement('div');
  return ReactDOM.render(<Dialog {...props} />, div);
}

function info(props: DialogProps) {
  return createDialog({
    ...dialogDefaultProps,
    icon: 'info',
    ...props,
    type: 'info',
  });
}

function success(props: DialogProps) {
  return createDialog({
    ...dialogDefaultProps,
    icon: 'success',
    ...props,
    type: 'success',
  });
}

function error(props: DialogProps) {
  return createDialog({
    ...dialogDefaultProps,
    icon: 'error',
    ...props,
    type: 'error',
  });
}

function warning(props: DialogProps) {
  return createDialog({
    ...dialogDefaultProps,
    icon: 'info',
    ...props,
    type: 'warning',
  });
}

function confirm(props: ConfirmProps) {
  return createDialog({
    ...confirmDefaultProps,
    ...props,
    type: 'confirm',
  });
}

export default { info, success, error, warning, confirm };
