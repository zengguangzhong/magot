import React from 'react';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom';

function TooltipDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Tooltip />
      </div>
    </>
  );
}

export default TooltipDemo;
