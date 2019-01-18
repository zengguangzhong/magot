import React from 'react';

import './Gallery.less';

import * as component from '../component';

export interface GalleryProps extends component.ComponentBase {}

const defaultProps: Partial<GalleryProps> = {};

function Gallery(props: GalleryProps) {
  const cls = component.getComponentClasses('gallery', props);
  return <div className={cls} />;
}

Gallery.defaultProps = defaultProps;

export default Gallery;
