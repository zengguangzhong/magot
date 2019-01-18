import React from 'react';

import './Slider.less';

import * as component from '../component';

export interface SliderProps extends component.ComponentBase {}

const defaultProps: Partial<SliderProps> = {};

function Slider(props: SliderProps) {
  const cls = component.getComponentClasses('slider', props);
  return <div className={cls} />;
}

Slider.defaultProps = defaultProps;

export default Slider;
