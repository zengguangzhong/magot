import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import Button from '../Button';
import Toast from '../Toast';

function CheckboxDemo() {
  const [controlledChecked, setControlledChecked] = React.useState(false);
  const [controlledDisabled, setControlledDisabled] = React.useState(false);
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Checkbox name="demo-checkbox">Checkbox</Checkbox>
        <Checkbox defaultChecked={true}>Checkbox</Checkbox>
        <Checkbox defaultChecked={true} disabled={true}>
          Checkbox
        </Checkbox>
        <Checkbox
          onChange={checked => Toast.info(checked ? 'checked' : 'unchecked')}>
          Change Event
        </Checkbox>
        <Checkbox />
      </div>
      <div className="demo-box">
        <Checkbox
          checked={controlledChecked}
          disabled={controlledDisabled}
          onChange={checked => setControlledChecked(checked)}>
          Controlled Checkbox
        </Checkbox>
        <Button
          type="primary"
          onClick={() => setControlledChecked(!controlledChecked)}>
          Toggle Checked
        </Button>
        <Button
          type="primary"
          onClick={() => setControlledDisabled(!controlledDisabled)}>
          Toggle Disabled
        </Button>
      </div>
      <div className="demo-box">
        <Checkbox name="demo-checkbox-native-group" defaultChecked={true}>
          Checkbox Group
        </Checkbox>
        <Checkbox name="demo-checkbox-native-group">Checkbox Group</Checkbox>
        <Checkbox name="demo-checkbox-native-group">Checkbox Group</Checkbox>
        <Checkbox name="demo-checkbox-native-group">Checkbox Group</Checkbox>
      </div>
    </>
  );
}

export default CheckboxDemo;
