import React from 'react';

import InputBase, { InputBaseProps } from '../InputBase';
import * as component from '../component';

import './TextArea.less';

export interface TextAreaProps extends InputBaseProps<HTMLTextAreaElement> {
  /**
   * @default 2
   */
  rows?: number;

  /**
   * 控制文本域缩放方式
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const defaultProps: Partial<TextAreaProps> = {
  rows: 2,
};

function TextArea(props: TextAreaProps) {
  const { rows = 2, resize, ...baseProps } = props;

  const textAreaStyle: Partial<React.CSSProperties> = {};
  if (resize) textAreaStyle.resize = resize;

  const cls = component.getComponentClasses('textarea', {}, props.className);
  return (
    <InputBase {...baseProps} className={cls}>
      <textarea rows={rows} style={textAreaStyle} />
    </InputBase>
  );
}

TextArea.defaultProps = defaultProps;

export default TextArea;
