import React from 'react';
import Badge from './Badge';
import { Link } from 'react-router-dom';

function BadgeDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Badge />
      </div>
    </>
  );
}

export default BadgeDemo;
