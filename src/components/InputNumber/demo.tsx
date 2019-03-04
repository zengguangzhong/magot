import React from 'react';
import InputNumber from './InputNumber';
import { Link } from 'react-router-dom';

function InputNumberDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <InputNumber min={1} max={10} defaultValue={2} onChange={console.log} />
        <InputNumber min={0} max={10} step={0.1} onChange={console.log} />
        <InputNumber min={0} max={10} step={2} onChange={console.log} />
        <InputNumber disabled={true} />
        <InputNumber
          min={0}
          max={100}
          defaultValue={100}
          // tslint:disable-next-line
          formatter={value => value + '%'}
          // tslint:disable-next-line
          parser={value => parseFloat(value)}
          onChange={console.log}
        />
      </div>
      <div className="demo-box">
        <InputNumber size="small" />
        <InputNumber size="normal" />
        <InputNumber size="large" />
      </div>
    </>
  );
}

export default InputNumberDemo;
