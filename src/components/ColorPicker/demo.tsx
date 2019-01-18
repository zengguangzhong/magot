import React from 'react';
import ColorPicker from './ColorPicker';
import { Link } from 'react-router-dom';

function ColorPickerDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <ColorPicker />
      </div>
    </>
  );
}

export default ColorPickerDemo;
