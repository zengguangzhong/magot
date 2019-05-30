import React from 'react';
import Collapse from './Collapse';
import { Link } from 'react-router-dom';

function CollapseDemo() {
  const text =
    'This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content.';
  const textStyle = { color: 'rgba(0,0,0,.65)', fontSize: 14, margin: 0 };
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Collapse active={[0, 1]} onChange={console.log}>
          <Collapse.Panel title="Panel Title1">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title2">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title3" disabled={true}>
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="demo-box">
        <Collapse accordion={true} active={0} onChange={console.log}>
          <Collapse.Panel title="Panel Title1">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title2">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title3">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="demo-box">
        <Collapse bordered={false} onChange={console.log}>
          <Collapse.Panel title="Panel Title1">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title2">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title3">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="demo-box">
        <Collapse onChange={console.log}>
          <Collapse.Panel title="Panel Title1">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title2" showArrow={false}>
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="demo-box">
        <Collapse active={0} onChange={console.log}>
          <Collapse.Panel title="Panel Title1">
            <Collapse active={0} onChange={console.log}>
              <Collapse.Panel title="SubPanel Title1">
                <p style={textStyle}>{text}</p>
              </Collapse.Panel>
              <Collapse.Panel title="SubPanel Title2">
                <p style={textStyle}>{text}</p>
              </Collapse.Panel>
            </Collapse>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title2">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
          <Collapse.Panel title="Panel Title3">
            <p style={textStyle}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
    </>
  );
}

export default CollapseDemo;
