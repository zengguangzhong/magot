import React from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

function PaginationDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Pagination />
      </div>
    </>
  );
}

export default PaginationDemo;
