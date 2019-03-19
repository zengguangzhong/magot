import React from 'react';
import sinon from 'sinon';
import { render, shallow } from 'enzyme';

export function injectTestSuites(
  Component: React.ComponentType<any>,
  style: React.CSSProperties
) {
  it('should renders custom className', () => {
    const wrapper = render(
      <Component className="jest-test-class">Button</Component>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('jest-test-class')).toEqual(true);
  });

  it('should renders custom styles', () => {
    const wrapper = render(<Component style={style}>My Component</Component>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulates click events', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(
      <Component onClick={handleClick}>Click me</Component>
    );
    wrapper.simulate('click');
    expect(handleClick).toHaveProperty('callCount', 1);
  });
}
