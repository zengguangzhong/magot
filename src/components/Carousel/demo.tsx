import React from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

function CarouselDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Carousel />
      </div>
    </>
  );
}

export default CarouselDemo;
