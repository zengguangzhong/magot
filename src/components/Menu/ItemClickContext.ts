import React from 'react';

export type ItemClickHandler = ((value?: string | number) => void) | undefined;

const context = React.createContext<ItemClickHandler>(undefined);

export default context;
