import React from 'react';

import './Form.less';

import * as component from '../component';

export interface FormProps extends component.ComponentBase {}

const defaultProps: Partial<FormProps> = {};

function Form(props: FormProps) {
  const cls = component.getComponentClasses('form', props);
  return <div className={cls} />;
}

Form.defaultProps = defaultProps;

export default Form;
