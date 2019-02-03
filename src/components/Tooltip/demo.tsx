import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import Button from '../Button';

function TooltipDemo() {
  const text = 'Tooltip text';
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
        <Tooltip title={text}>
          <p style={{ display: 'inline-block' }}>
            Hover on me to show tooltip.
          </p>
        </Tooltip>
        <br />
        <Tooltip title={text}>
          <Button type="primary">Tooltip</Button>
        </Tooltip>
        <Tooltip
          title={
            <div>
              {text}
              <br />
              {text}
            </div>
          }>
          <Button type="primary">MultLine</Button>
        </Tooltip>
      </div>
      <div className="demo-box">
        <div style={style1}>
          <Tooltip title={text} placement="topLeft">
            <Button>TL</Button>
          </Tooltip>
          <Tooltip title={text} placement="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip title={text} placement="topRight">
            <Button>TR</Button>
          </Tooltip>
        </div>
        <div style={style2}>
          <Tooltip title={text} placement="leftTop">
            <Button>LT</Button>
          </Tooltip>
          <Tooltip title={text} placement="rightTop">
            <Button>RT</Button>
          </Tooltip>
        </div>
        <div style={style2}>
          <Tooltip title={text} placement="left">
            <Button>Left</Button>
          </Tooltip>
          <Tooltip title={text} placement="right">
            <Button>Right</Button>
          </Tooltip>
        </div>
        <div style={style2}>
          <Tooltip title={text} placement="leftBottom">
            <Button>LB</Button>
          </Tooltip>
          <Tooltip title={text} placement="rightBottom">
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div style={{ ...style1, marginBottom: 0 }}>
          <Tooltip title={text} placement="bottomLeft">
            <Button>BL</Button>
          </Tooltip>
          <Tooltip title={text} placement="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip title={text} placement="bottomRight">
            <Button>BR</Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default TooltipDemo;
