import React from 'react';
import Qrcode from './Qrcode';
import { Link } from 'react-router-dom';

function QrcodeDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Qrcode />
      </div>
    </>
  );
}

export default QrcodeDemo;
