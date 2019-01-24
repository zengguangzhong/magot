import React from 'react';

import './VideoPlayer.less';

import * as component from '../component';

export interface VideoPlayerProps extends component.BaseComponent {}

const defaultProps: Partial<VideoPlayerProps> = {};

function VideoPlayer(props: VideoPlayerProps) {
  const cls = component.getComponentClasses('video-player', props);
  return <div className={cls} />;
}

VideoPlayer.defaultProps = defaultProps;

export default VideoPlayer;
