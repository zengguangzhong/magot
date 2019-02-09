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
    </>
  );
}

export default CheckboxGroupDemo;
