import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox, { CheckboxOption } from '../Checkbox';

function CheckboxGroupDemo() {
  const options: CheckboxOption[] = [
    {
      label: 'Option1',
      value: 'option1',
      checked: true,
    },
    {
      label: 'Option2',
      value: 'option2',
    },
    {
      label: 'Option3',
      value: 'option3',
      disabled: true,
    },
  ];
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Checkbox.Group options={options} onChange={console.log} />
        <br />
        <Checkbox.Group options={options} disabled={true} />
      </div>
      <div className="demo-box">
        <Checkbox.Group onChange={console.log}>
          <Checkbox value="option1" checked={true}>
            Option1
          </Checkbox>
          <Checkbox value="option2">Option2</Checkbox>
          <Checkbox value="option3" disabled={true}>
            Option3
          </Checkbox>
        </Checkbox.Group>
        <br />
        <Checkbox.Group disabled={true}>
          <Checkbox value="option1" checked={true}>
            Option1
          </Checkbox>
          <Checkbox value="option2">Option2</Checkbox>
          <Checkbox value="option3" disabled={true}>
            Option3
          </Checkbox>
        </Checkbox.Group>
      </div>
    </>
  );
}

export default CheckboxGroupDemo;
