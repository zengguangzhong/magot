import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

function FormDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Form />
      </div>
    </>
  );
}

export default FormDemo;
