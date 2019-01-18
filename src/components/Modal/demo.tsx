import React from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';

function ModalDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Modal />
      </div>
    </>
  );
}

export default ModalDemo;
