import React from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';

function SearchDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Search />
      </div>
    </>
  );
}

export default SearchDemo;
