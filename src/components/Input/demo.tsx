import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import Toast from '../Toast';

function InputDemo() {
  const [controlledValue, setControlledValue] = React.useState('');
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Input
          icon="search"
          placeholder="This is a Input"
          onChange={e => console.log(e.target.value)}
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
          onClear={() => Toast.info('Cleared')}
          onChange={e => console.log(e.target.value)}
        />
        <Input placeholder="This is a readonly Input" readOnly={true} />
      </div>
      <div className="demo-box">
        <Input icon="search" placeholder="This is a Input" size="small" />
        <Input icon="search" placeholder="This is a Input" size="normal" />
        <Input icon="search" placeholder="This is a Input" size="large" />
      </div>
      <div className="demo-box">
        <Input
          placeholder="controlled input"
          value={controlledValue}
          onChange={e => setControlledValue(e.target.value)}
        />
      </div>
    </>
  );
}

export default InputDemo;
