import React from 'react';
import Table from './Table';
import { Link } from 'react-router-dom';

function TableDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Table />
      </div>
    </>
  );
}

export default TableDemo;
