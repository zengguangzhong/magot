import React from 'react';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router-dom';

function BreadcrumbDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Breadcrumb />
      </div>
    </>
  );
}

export default BreadcrumbDemo;
