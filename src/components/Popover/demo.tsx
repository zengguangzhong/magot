import React from 'react';
import { Link } from 'react-router-dom';
import Popover from './Popover';
import Button from '../Button';

function PopoverDemo() {
  const title = 'This is a title';
  const content = 'This is a content.';
  const style1 = {
    width: 200,
    marginBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
    display: 'flex',
    justifyContent: 'space-between',
  };
  const style2 = {
    width: 320,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
  };
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Popover title={title} content={content}>
          <Button>Hover me</Button>
        </Popover>
        <Popover title={title} content={content} trigger="click">
          <Button>Click me</Button>
        </Popover>
        <Popover content={content}>
          <Button>Hover me(no title)</Button>
        </Popover>
        <Popover
          title="ButtonGroup"
          content={
            <Button.Group>
              <Button type="primary" icon="arrow-left">
                Go Back
              </Button>
              <Button type="primary" icon="arrow-right" iconPosition="right">
                Go Forward
              </Button>
            </Button.Group>
          }>
          <Button>Nested Components</Button>
        </Popover>
        <Popover
          placement="bottom"
          trigger="click"
          title="Delete Tips"
          content={
            <>
              <div>Do you want to delete the content?</div>
              <div style={{ textAlign: 'right', marginTop: 12 }}>
                <Button type="link" size="small" style={{ marginRight: 10 }}>
                  No
                </Button>
                <Button type="primary" size="small">
                  Yes
                </Button>
              </div>
            </>
          }>
          <Button>Nested Dialog</Button>
        </Popover>
      </div>
      <div className="demo-box">
        <div style={style1}>
          <Popover title={title} content={content} placement="topLeft">
            <Button>TL</Button>
          </Popover>
          <Popover title={title} content={content} placement="top">
            <Button>Top</Button>
          </Popover>
          <Popover title={title} content={content} placement="topRight">
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} placement="leftTop">
            <Button>LT</Button>
          </Popover>
          <Popover title={title} content={content} placement="rightTop">
            <Button>RT</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} placement="left">
            <Button>Left</Button>
          </Popover>
          <Popover title={title} content={content} placement="right">
            <Button>Right</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} placement="leftBottom">
            <Button>LB</Button>
          </Popover>
          <Popover title={title} content={content} placement="rightBottom">
            <Button>RB</Button>
          </Popover>
        </div>
        <div style={{ ...style1, marginBottom: 0 }}>
          <Popover title={title} content={content} placement="bottomLeft">
            <Button>BL</Button>
          </Popover>
          <Popover title={title} content={content} placement="bottom">
            <Button>Bottom</Button>
          </Popover>
          <Popover title={title} content={content} placement="bottomRight">
            <Button>BR</Button>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default PopoverDemo;
