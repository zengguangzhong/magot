import React from 'react';

export type ItemClickHandler =
  | ((name?: string, value?: any) => void)
  | undefined;

const context = React.createContext<ItemClickHandler>(undefined);

export default context;
