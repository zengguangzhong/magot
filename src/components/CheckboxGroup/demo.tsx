import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox, { CheckboxOption } from '../Checkbox';

function CheckboxGroupDemo() {
  const options: CheckboxOption[] = [
    {
      label: 'Option1',
      value: 'option1',
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
        <Checkbox.Group
          options={options}
          value={['option1']}
          onChange={console.log}
        />
        <br />
        <Checkbox.Group options={options} value={['option1']} disabled={true} />
      </div>
      <div className="demo-box">
        <Checkbox.Group value={['option1']} onChange={console.log}>
          <Checkbox value="option1">Option1</Checkbox>
          <Checkbox value="option2">Option2</Checkbox>
          <Checkbox value="option3">Option3</Checkbox>
        </Checkbox.Group>
        <br />
        <Checkbox.Group value={['option1']} disabled={true}>
          <Checkbox value="option1">Option1</Checkbox>
          <Checkbox value="option2">Option2</Checkbox>
          <Checkbox value="option3" disabled={true}>
            Option3
          </Checkbox>
        </Checkbox.Group>
        <br />
        <Checkbox.Group
          name="demo-checkbox-group"
          value={['option1']}
          onChange={console.log}>
          <Checkbox value="option1">Native Group1</Checkbox>
          <Checkbox value="option2">Native Group2</Checkbox>
          <Checkbox value="option3">Native Group3</Checkbox>
        </Checkbox.Group>
      </div>
    </>
  );
}

export default CheckboxGroupDemo;
