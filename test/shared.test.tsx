import React from 'react';
import { render, shallow } from 'enzyme';

export function injectStyleTestSuites(Component: React.ComponentType<any>) {
  it('should renders custom className', () => {
    const wrapper = render(<Component className="jest-test-class" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('jest-test-class')).toEqual(true);
  });

  it('should renders custom styles', () => {
    const wrapper = render(
      <Component style={{ color: '#333', backgroundColor: '#f0f0f0' }} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.attr('style')).toBeDefined();
  });
}

export function injectClickEventTestSuite(Component: React.ComponentType<any>) {
  it('should simulates click events', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<Component onClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toBeCalled();
  });
}
