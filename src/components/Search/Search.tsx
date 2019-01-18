import React from 'react';

import './Search.less';

import * as component from '../component';

export interface SearchProps extends component.ComponentBase {}

const defaultProps: Partial<SearchProps> = {};

function Search(props: SearchProps) {
  const cls = component.getComponentClasses('search', props);
  return <div className={cls} />;
}

Search.defaultProps = defaultProps;

export default Search;
