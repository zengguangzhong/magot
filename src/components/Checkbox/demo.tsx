import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import Toast from '../Toast';

function CheckboxDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Checkbox name="demo-checkbox">Checkbox</Checkbox>
        <Checkbox checked={true}>Checkbox</Checkbox>
        <Checkbox checked={true} disabled={true}>
          Checkbox
        </Checkbox>
        <Checkbox
          // tslint:disable-next-line
          onChange={checked => Toast.info(checked ? 'checked' : 'unchecked')}>
          Change Event
        </Checkbox>
        <Checkbox />
      </div>
    </>
  );
}

export default CheckboxDemo;
