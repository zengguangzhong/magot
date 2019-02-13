import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import Toast from '../Toast';

function InputDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Input
          icon="search"
          placeholder="This is a Input"
          // tslint:disable-next-line
          onChange={e => console.log(e.target.value)}
          // tslint:disable-next-line
          onIconClick={() => Toast.info('Clicked the Icon')}
        />
        <Input
          icon="search"
          iconPosition="left"
          placeholder="This is a Input"
        />
        <Input placeholder="This is a Input" defaultValue="input content" />
        <Input placeholder="This is a Input(disabled)" disabled={true} />
        <Input
          placeholder="Input with clear icon"
          clearable={true}
          // tslint:disable-next-line
          onClear={() => Toast.info('Cleared')}
          // tslint:disable-next-line
          onChange={e => console.log(e.target.value)}
        />
      </div>
      <div className="demo-box">
        <Input icon="search" placeholder="This is a Input" size="small" />
        <Input icon="search" placeholder="This is a Input" size="normal" />
        <Input icon="search" placeholder="This is a Input" size="large" />
      </div>
    </>
  );
}

export default InputDemo;
