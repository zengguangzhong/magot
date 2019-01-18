import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function CardDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Card />
      </div>
    </>
  );
}

export default CardDemo;
