import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';

function ImageDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Image />
      </div>
    </>
  );
}

export default ImageDemo;
