import React from 'react';
import Gallery from './Gallery';
import { Link } from 'react-router-dom';

function GalleryDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Gallery />
      </div>
    </>
  );
}

export default GalleryDemo;
