import React from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';
import Button from '../Button';
import Loading from '../Loading';

function PopupDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Popup overlay={<div>This is a popup message</div>}>
          <Button type="primary">hover me to show popup</Button>
        </Popup>
        <Popup overlay={<Loading tip="loading..." />}>
          <Button type="primary">hover me to show loading</Button>
        </Popup>
      </div>
    </>
  );
}

export default PopupDemo;
