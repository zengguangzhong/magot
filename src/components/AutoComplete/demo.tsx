import React from 'react';
import AutoComplete from './AutoComplete';
import { Link } from 'react-router-dom';

function AutoCompleteDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <AutoComplete />
      </div>
    </>
  );
}

export default AutoCompleteDemo;
