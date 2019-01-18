import React from 'react';
import List from './List';
import { Link } from 'react-router-dom';

function ListDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <List />
      </div>
    </>
  );
}

export default ListDemo;
