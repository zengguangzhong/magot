import React from 'react';
import Checkbox from './Checkbox';
import { Link } from 'react-router-dom';

function CheckboxDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Checkbox>Checkbox</Checkbox>
        <Checkbox defaultChecked={true}>Checkbox</Checkbox>
        <Checkbox disabled={true}>Checkbox</Checkbox>
        <Checkbox defaultChecked={true} disabled={true}>
          Checkbox
        </Checkbox>
        <Checkbox>Controlled</Checkbox>
        <Checkbox checked={true}>Controlled</Checkbox>
      </div>
    </>
  );
}

export default CheckboxDemo;
