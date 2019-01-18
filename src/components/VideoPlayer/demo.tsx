import React from 'react';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';

function VideoPlayerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <VideoPlayer />
      </div>
    </>
  );
}

export default VideoPlayerDemo;
