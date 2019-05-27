import React from 'react';
import { render } from 'enzyme';
import Badge from '../Badge';

describe('Badge', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Badge count={10} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders when count is 0', () => {
    const wrapper = render(<Badge count={0} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('sup')).toHaveLength(0);
  });

  it('should renders `count` when pass in', () => {
    const wrapper = render(<Badge count={10} />);
    const node = wrapper.find('.mgt-badge-count');
    expect(wrapper).toMatchSnapshot();
    expect(node).toHaveLength(1);
    expect(node.text()).toEqual('10');
    expect(node.attr('title')).toEqual('10');
  });

  it('should renders large `count` when pass in', () => {
    const wrapper = render(<Badge count={100} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-badge-count').text()).toEqual('99+');
  });

  it('should renders `count` and `max` when pass in', () => {
    const wrapper = render(<Badge count={100} max={1000} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-badge-count').text()).toEqual('100');
  });

  it('should renders `dot` when pass in', () => {
    const wrapper = render(<Badge count={5} dot={true} />);
    const node = wrapper.find('.mgt-badge-dot');
    expect(wrapper).toMatchSnapshot();
    expect(node).toHaveLength(1);
    expect(node.text()).toEqual('');
  });

  it('should renders when wraps other dom', () => {
    const wrapper = render(
      <Badge count={5}>
        <a href="#" />
      </Badge>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.hasClass('.mgt-badge-empty')).toBe(false);
  });

  it('should renders custom className', () => {
    const wrapper = render(<Badge className="jest-test-class" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('jest-test-class')).toEqual(true);
  });

  it('should renders custom styles', () => {
    const wrapper = render(
      <Badge count={5} style={{ color: '#333', backgroundColor: '#f0f0f0' }} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('sup').attr('style')).toBeDefined();
  });
});
