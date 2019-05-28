import React from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

function CarouselDemo() {
  const cardStyle = {
    height: 240,
    backgroundColor: '#20a0ff',
    color: '#fff',
    fontSize: 48,
  };
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Carousel onChange={console.log}>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">1</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">2</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">3</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">4</h3>
          </Carousel.Card>
        </Carousel>
      </div>
      <div className="demo-box">
        <Carousel autoPlay={true}>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">1</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">2</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">3</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">4</h3>
          </Carousel.Card>
        </Carousel>
      </div>
      <div className="demo-box">
        <Carousel autoPlay={true} effect="fade">
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">1</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">2</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">3</h3>
          </Carousel.Card>
          <Carousel.Card style={cardStyle}>
            <h3 className="demo-center-block">4</h3>
          </Carousel.Card>
        </Carousel>
      </div>
    </>
  );
}

export default CarouselDemo;
