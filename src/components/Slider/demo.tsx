import React from 'react';
import Slider from './Slider';
import { Link } from 'react-router-dom';

function SliderDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Slider />
      </div>
    </>
  );
}

export default SliderDemo;
