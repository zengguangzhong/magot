import React from 'react';

import './Carousel.less';

import * as component from '../component';

export interface CarouselProps extends component.BaseComponent {}

const defaultProps: Partial<CarouselProps> = {};

function Carousel(props: CarouselProps) {
  const cls = component.getComponentClasses('carousel', props);
  return <div className={cls} />;
}

Carousel.defaultProps = defaultProps;

export default Carousel;
