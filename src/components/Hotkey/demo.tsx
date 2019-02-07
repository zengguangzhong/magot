import React from 'react';
import { Link } from 'react-router-dom';
import Hotkey, { HotkeyData } from './Hotkey';
import Toast from '../Toast';

function HotkeyDemo() {
  const hotkeys: HotkeyData[] = [
    {
      key: 13,
      name: 'enter',
    },
    {
      key: 8,
      name: 'backspace',
    },
  ];
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Hotkey
          active={true}
          hotkeys={hotkeys}
          // tslint:disable-next-line
          onTrigger={data => Toast.info(data.name)}>
          <div>Press: enter, backspace</div>
        </Hotkey>
      </div>
    </>
  );
}

export default HotkeyDemo;
