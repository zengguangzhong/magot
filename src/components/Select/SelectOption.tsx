import React from 'react';

import * as component from '../component';

export interface SelectOptionProps extends component.BaseComponent {}

const defaultProps: Partial<SelectOptionProps> = {};

function SelectOption(props: SelectOptionProps) {
  const cls = component.getComponentClasses('select-option', props);
  return <div className={cls} />;
}

SelectOption.defaultProps = defaultProps;

export default SelectOption;
