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
        <Badge count={5}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={10}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={100}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={999} max={999}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={1000} max={999}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={1000} max={999} style={{ backgroundColor: '#52c41a' }}>
          <a href="#" className="demo-card" />
        </Badge>
        <Badge count={5} dot={true}>
          <a href="#" className="demo-card" />
        </Badge>
      </div>
      <div className="demo-box">
        <Badge count={5} />
        <Badge count={10} />
        <Badge count={100} />
        <Badge count={999} max={999} />
        <Badge count={1000} max={999} />
        <Badge count={1000} max={999} style={{ backgroundColor: '#52c41a' }} />
        <Badge count={5} dot={true} />
      </div>
    </>
  );
}

export default BadgeDemo;
