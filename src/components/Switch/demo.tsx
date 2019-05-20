import React from 'react';
import { Link } from 'react-router-dom';
import Switch from './Switch';
import Button from '../Button';
import Toast from '../Toast';

function SwitchDemo() {
  const [disabled, setDisabled] = React.useState(true);
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Switch />
        <Switch checked={true} name="demo-switch" />
        <Switch checked={true} onText="ON" offText="OFF" />
        <Switch
          checked={true}
          onText="开"
          offText="关"
          onChange={checked => Toast.info(checked ? '开' : '关')}
        />
      </div>
      <div className="demo-box">
        <Switch disabled={disabled} checked={true} />
        <Button type="primary" onClick={() => setDisabled(!disabled)}>
          Toggle Disabled
        </Button>
      </div>
      <div className="demo-box">
        <Switch size="small" checked={true} onText="ON" offText="OFF" />
        <Switch checked={true} onText="ON" offText="OFF" />
        <Switch size="large" checked={true} onText="ON" offText="OFF" />
      </div>
    </>
  );
}

export default SwitchDemo;
