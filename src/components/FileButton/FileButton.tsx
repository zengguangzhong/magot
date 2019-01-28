import React from 'react';

import Button, { ButtonProps } from '../Button';
import * as component from '../component';
import * as fileChecker from '../../utils/check-file';

import './FileButton.less';

type PickButtonProps = Pick<
  ButtonProps,
  | 'block'
  | 'children'
  | 'circular'
  | 'className'
  | 'disabled'
  | 'icon'
  | 'iconPosition'
  | 'loading'
  | 'size'
  | 'square'
  | 'style'
  | 'type'
>;

export interface FileButtonProps extends PickButtonProps {
  /**
   * 是否可以多选，默认只能单选
   * @default false
   */
  multiple?: boolean;

  /**
   * 文件类型过滤列表，默认全部类型
   * @default ["*"]
   */
  filters?: string[];

  /**
   * 文件类型不匹配，错误提示文案
   * @default 不支持该文件类型
   */
  filterError?: string;

  /**
   * 最多能够选择的文件数
   * @default 20
   */
  maxCount?: number;

  /**
   * 多选文件超限时的错误提示文案
   * @default 最多可以批量上传${maxCount}个文件
   */
  countError?: string;

  /**
   * 最大字节数，单位k，默认5M
   * @default 5120
   */
  maxSize?: number;

  /**
   * 最小字节数，单位k
   * @default 0
   */
  minSize?: number;

  /**
   * 文件字节数不匹配，错误提示文案
   * @default 文件大小不符合
   */
  sizeError?: string;

  /**
   * 选择文件后（文件类型匹配、大小匹配），触发onChange回调
   * 当multiple=true，则参数是FileList
   */
  onChange?: (file: File | FileList) => void;

  /**
   * 抛出错误
   */
  onError?: (err: Error) => void;
}

const defaultProps: Partial<FileButtonProps> = {
  multiple: false,
  filters: ['*'],
  filterError: '不支持该文件类型',
  maxCount: 20,
  countError: '最多可以批量上传${maxCount}个文件',
  maxSize: 5 * 1024,
  minSize: 0,
  sizeError: '文件大小不符合',
};

function FileButton(props: FileButtonProps) {
  const {
    className,
    children,
    multiple,
    filters = [],
    filterError,
    maxCount,
    countError,
    maxSize,
    minSize,
    sizeError,
    onChange,
    onError,
    ...btnProps
  } = props;
  const cls = component.getComponentClasses('file-button', {
    className,
  });
  const _onChange = function(evt: React.ChangeEvent<HTMLInputElement>) {
    onNativeChange(evt, props);
  };
  return (
    <Button {...btnProps} className={cls}>
      <input
        type="file"
        accept={filters.join(',')}
        multiple={!!multiple}
        disabled={!!props.disabled}
        onChange={_onChange}
      />
      {children}
    </Button>
  );
}

function onNativeChange(
  evt: React.ChangeEvent<HTMLInputElement>,
  props: FileButtonProps
) {
  const { multiple, maxCount = 0, countError = '', onChange, onError } = props;
  const fileInput = evt.target;
  const files = fileInput.files;
  if (!files || !files.length) return;

  if (files.length > maxCount) {
    fileInput.value = '';
    const msg = countError.replace(/\${maxCount}/g, '' + maxCount);
    onError && onError(new Error(msg));
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) continue;
    const msg = checkFile(file, props);
    if (msg !== true) {
      fileInput.value = '';
      onError && onError(new Error(msg));
      return;
    }
  }

  onChange && onChange(multiple ? files : files[0]);
}

function checkFile(file: File, props: FileButtonProps) {
  const msg = checkFileType(file, props);
  if (msg !== true) return msg;
  return checkFileSize(file, props);
}

function checkFileType(file: File, props: FileButtonProps) {
  const { filters = [], filterError } = props;
  const result = fileChecker.checkFileType(file, filters);
  return result ? result : filterError || '';
}

function checkFileSize(file: File, props: FileButtonProps) {
  const { minSize = 0, maxSize = 0, sizeError } = props;
  const result = fileChecker.checkFileSize(file, maxSize, minSize);
  return result ? result : sizeError || '';
}

FileButton.defaultProps = defaultProps;

export default FileButton;
