import React from 'react';

import './Card.less';

import * as component from '../component';

export interface CardProps extends component.BaseComponent {}

const defaultProps: Partial<CardProps> = {};

function Card(props: CardProps) {
  const cls = component.getComponentClasses('card', props);
  return <div className={cls} />;
}

Card.defaultProps = defaultProps;

export default Card;
