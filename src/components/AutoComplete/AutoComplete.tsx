import React from 'react';

import './AutoComplete.less';

import * as component from '../component';

export interface AutoCompleteProps extends component.ComponentBase {}

const defaultProps: Partial<AutoCompleteProps> = {};

function AutoComplete(props: AutoCompleteProps) {
  const cls = component.getComponentClasses('auto-complete', props);
  return <div className={cls} />;
}

AutoComplete.defaultProps = defaultProps;

export default AutoComplete;
