import React from 'react';
import { Link } from 'react-router-dom';
import Radio from './Radio';
import Button from '../Button';

function RadioDemo() {
  const [controlledChecked, setControlledChecked] = React.useState(false);
  const [controlledDisabled, setControlledDisabled] = React.useState(false);
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Radio name="demo-checkbox">Radio</Radio>
        <Radio defaultChecked={true}>Radio</Radio>
        <Radio defaultChecked={true} disabled={true}>
          Radio
        </Radio>
        <Radio />
      </div>
      <div className="demo-box">
        <Radio
          checked={controlledChecked}
          disabled={controlledDisabled}
          // tslint:disable-next-line
          onChange={() => setControlledChecked(true)}>
          Controlled Radio
        </Radio>
        <Button
          type="primary"
          // tslint:disable-next-line
          onClick={() => setControlledChecked(!controlledChecked)}>
          Toggle Checked
        </Button>
        <Button
          type="primary"
          // tslint:disable-next-line
          onClick={() => setControlledDisabled(!controlledDisabled)}>
          Toggle Disabled
        </Button>
      </div>
      <div className="demo-box">
        <Radio name="demo-radio-native-group" defaultChecked={true}>
          Radio Group
        </Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
      </div>
    </>
  );
}

export default RadioDemo;
