import React from 'react';
import { Link } from 'react-router-dom';
import Radio from './Radio';

function RadioDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Radio name="demo-checkbox">Radio</Radio>
        <Radio checked={true}>Radio</Radio>
        <Radio checked={true} disabled={true}>
          Radio
        </Radio>
        <Radio />
      </div>
    </>
  );
}

export default RadioDemo;
