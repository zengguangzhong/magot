import React from 'react';

import './Image.less';

import * as component from '../component';

export interface ImageProps extends component.ComponentBase {}

const defaultProps: Partial<ImageProps> = {};

function Image(props: ImageProps) {
  const cls = component.getComponentClasses('image', props);
  return <div className={cls} />;
}

Image.defaultProps = defaultProps;

export default Image;
