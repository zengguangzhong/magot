import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Checkbox from '../Checkbox';
import Button from '../../Button';
import {
  injectStyleTestSuites,
  injectFocusEventsTestSuites,
} from '../../../../test/shared.test';

describe('Checkbox', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Checkbox>Checkbox</Checkbox>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-checkbox')).toBe(true);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('.mgt-checkbox-control')).toHaveLength(1);
    expect(wrapper.find('.mgt-checkbox-text')).toHaveLength(1);
  });

  it('should renders not label', () => {
    const wrapper = render(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-checkbox-text')).toHaveLength(0);
  });

  it('should renders checked', () => {
    const wrapper = render(<Checkbox defaultChecked={true}>Checkbox</Checkbox>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').attr('checked')).toEqual('checked');
  });

  it('should renders disabled', () => {
    const wrapper = render(<Checkbox disabled={true}>Checkbox</Checkbox>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-checkbox-disabled')).toBe(true);
    expect(wrapper.find('input').attr('disabled')).toEqual('disabled');
  });

  it('should renders form props when passed in', () => {
    const wrapper = render(
      <Checkbox id="demoCheckbox" name="demo-checkbox" defaultValue="a">
        Checkbox
      </Checkbox>
    );
    const input = wrapper.find('input');
    expect(wrapper).toMatchSnapshot();
    expect(input.attr('id')).toEqual('demoCheckbox');
    expect(input.attr('name')).toEqual('demo-checkbox');
    expect(input.attr('value')).toEqual('a');
  });

  it('should simulates change events', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<Checkbox onChange={handleChange} />);
    const eventData = { target: { checked: true } };
    wrapper.find('input').simulate('change', eventData);
    expect(handleChange).toHaveBeenCalledWith(true, undefined, eventData);
  });

  it('should checked controlled', () => {
    const Controlled = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <Checkbox
          checked={checked}
          // tslint:disable-next-line
          onChange={checked => setChecked(checked)}>
          Controlled Checkbox
        </Checkbox>
      );
    };
    const wrapper = mount(<Controlled />);

    const checkbox1 = wrapper.find(Checkbox);
    expect(checkbox1).toMatchSnapshot();
    expect(checkbox1.prop('checked')).toEqual(false);

    const eventData = { target: { checked: true } };
    checkbox1.find('input').simulate('change', eventData);

    const checkbox2 = wrapper.find(Checkbox);
    expect(checkbox2).toMatchSnapshot();
    expect(checkbox2.prop('checked')).toEqual(true);
  });

  it('should checked controlled by Button click events', () => {
    const Controlled = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <div>
          <Checkbox checked={checked}>Controlled Checkbox</Checkbox>
          <Button
            // tslint:disable-next-line
            onClick={() => setChecked(!checked)}>
            Toggle Checked
          </Button>
        </div>
      );
    };
    const wrapper = mount(<Controlled />);

    const checkbox1 = wrapper.find(Checkbox);
    expect(checkbox1).toMatchSnapshot();
    expect(checkbox1.prop('checked')).toEqual(false);

    wrapper.find('button').simulate('click');

    const checkbox2 = wrapper.find(Checkbox);
    expect(checkbox2).toMatchSnapshot();
    expect(checkbox2.prop('checked')).toEqual(true);
  });

  it('should disabled controlled by Button click events', () => {
    const Controlled = () => {
      const [disabled, setDisabled] = React.useState(false);
      return (
        <div>
          <Checkbox disabled={disabled}>Controlled Checkbox</Checkbox>
          <Button
            // tslint:disable-next-line
            onClick={() => setDisabled(!disabled)}>
            Toggle Disabled
          </Button>
        </div>
      );
    };
    const wrapper = mount(<Controlled />);

    const checkbox1 = wrapper.find(Checkbox);
    expect(checkbox1).toMatchSnapshot();
    expect(checkbox1.prop('disabled')).toEqual(false);

    wrapper.find('button').simulate('click');

    const checkbox2 = wrapper.find(Checkbox);
    expect(checkbox2).toMatchSnapshot();
    expect(checkbox2.prop('disabled')).toEqual(true);
  });

  injectStyleTestSuites(Checkbox);
  injectFocusEventsTestSuites(Checkbox);
});
