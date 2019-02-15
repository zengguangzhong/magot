import React from 'react';
import { MenuProps } from './Menu';

export type ContextData = Pick<
  MenuProps,
  'multiple' | 'selectable' | 'selectedValues' | 'onItemClick'
>;

const context = React.createContext<ContextData | null>(null);

export default context;
