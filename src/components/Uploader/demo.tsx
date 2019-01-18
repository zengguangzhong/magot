import React from 'react';
import Uploader from './Uploader';
import { Link } from 'react-router-dom';

function UploaderDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Uploader />
      </div>
    </>
  );
}

export default UploaderDemo;
