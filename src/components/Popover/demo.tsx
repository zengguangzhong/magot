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
          align="bottom"
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
          <Popover title={title} content={content} align="topLeft">
            <Button>TL</Button>
          </Popover>
          <Popover title={title} content={content} align="top">
            <Button>Top</Button>
          </Popover>
          <Popover title={title} content={content} align="topRight">
            <Button>TR</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} align="leftTop">
            <Button>LT</Button>
          </Popover>
          <Popover title={title} content={content} align="rightTop">
            <Button>RT</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} align="left">
            <Button>Left</Button>
          </Popover>
          <Popover title={title} content={content} align="right">
            <Button>Right</Button>
          </Popover>
        </div>
        <div style={style2}>
          <Popover title={title} content={content} align="leftBottom">
            <Button>LB</Button>
          </Popover>
          <Popover title={title} content={content} align="rightBottom">
            <Button>RB</Button>
          </Popover>
        </div>
        <div style={{ ...style1, marginBottom: 0 }}>
          <Popover title={title} content={content} align="bottomLeft">
            <Button>BL</Button>
          </Popover>
          <Popover title={title} content={content} align="bottom">
            <Button>Bottom</Button>
          </Popover>
          <Popover title={title} content={content} align="bottomRight">
            <Button>BR</Button>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default PopoverDemo;
