import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

function BreadcrumbDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">User</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Template</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Editor</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Workbench</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="demo-box">
        <Breadcrumb>
          <Breadcrumb.Item icon="home" />
          <Breadcrumb.Item icon="user">
            <a href="">User</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item icon="store">
            <a href="">Template</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Editor</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Workbench</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="demo-box">
        <Breadcrumb separator="&gt;">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">User</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Template</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Editor</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Workbench</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
}

export default BreadcrumbDemo;
