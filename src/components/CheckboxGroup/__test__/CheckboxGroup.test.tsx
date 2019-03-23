import React from 'react';
import { render, mount } from 'enzyme';
import Checkbox from '../../Checkbox';
import CheckboxGroup, { CheckboxOption } from '../CheckboxGroup';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('CheckboxGroup', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(
      <CheckboxGroup>
        <Checkbox value="option1">Option1</Checkbox>
        <Checkbox value="option2">Option2</Checkbox>
        <Checkbox value="option3">Option3</Checkbox>
      </CheckboxGroup>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children()).toHaveLength(3);
  });

  it('should renders by options', () => {
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
      },
    ];
    const wrapper = render(<CheckboxGroup options={options} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children()).toHaveLength(3);
  });

  it('should renders empty children', () => {
    const wrapper = render(<CheckboxGroup />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.children()).toHaveLength(0);
  });

  it('should renders `value` prop when passed in', () => {
    const wrapper = render(
      <CheckboxGroup value={['option1']}>
        <Checkbox value="option1">Option1</Checkbox>
        <Checkbox value="option2">Option2</Checkbox>
        <Checkbox value="option3">Option3</Checkbox>
      </CheckboxGroup>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[checked]').val()).toEqual('option1');
  });

  it('should renders `disabled` prop when passed in', () => {
    const wrapper = render(
      <CheckboxGroup disabled={true}>
        <Checkbox value="option1">Option1</Checkbox>
        <Checkbox value="option2">Option2</Checkbox>
        <Checkbox value="option3">Option3</Checkbox>
      </CheckboxGroup>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-checkbox-group-disabled')).toBe(true);
    expect(wrapper.find('input[disabled]')).toHaveLength(3);
  });

  it('should renders `name` prop when passed in', () => {
    const wrapper = render(
      <CheckboxGroup name="group">
        <Checkbox value="option1">Native Group1</Checkbox>
        <Checkbox value="option2">Native Group2</Checkbox>
        <Checkbox value="option3">Native Group3</Checkbox>
      </CheckboxGroup>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[name="group"]')).toHaveLength(3);
  });

  it('should simulates change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <CheckboxGroup value={['option1']} onChange={handleChange}>
        <Checkbox value="option1">Option1</Checkbox>
        <Checkbox value="option2">Option2</Checkbox>
        <Checkbox value="option3">Option3</Checkbox>
      </CheckboxGroup>
    );
    const eventData = { target: { checked: true } };
    wrapper.find('input[value="option2"]').simulate('change', eventData);
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  injectStyleTestSuites(CheckboxGroup);
});
