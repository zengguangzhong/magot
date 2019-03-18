import React from 'react';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';
import Icon from '../Icon';

describe('Icon', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Icon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders `.mgt-icon` className', () => {
    const wrapper = shallow(<Icon />);
    expect(wrapper.hasClass('mgt-icon')).toEqual(true);
  });

  it('should renders `name` prop when passed in', () => {
    const wrapper = shallow(<Icon name="home" />);
    expect(wrapper.hasClass('mgt-icon-home')).toEqual(true);
  });

  it('should renders `spin` prop when passed in', () => {
    const wrapper = shallow(<Icon spin={true} />);
    expect(wrapper.hasClass('spin')).toEqual(true);
  });

  it('should renders `size` prop when passed in', () => {
    const wrapper = shallow(<Icon size={28} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders custom className', () => {
    const wrapper = shallow(<Icon className="jest-test-icon" />);
    expect(wrapper.hasClass('jest-test-icon')).toEqual(true);
  });

  it('should renders custom styles', () => {
    const wrapper = shallow(<Icon style={{ color: '#bfbfbf' }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulates click events', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(<Icon onClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveProperty('callCount', 1);
  });
});
