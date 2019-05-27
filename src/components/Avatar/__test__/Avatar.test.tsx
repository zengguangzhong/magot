import React from 'react';
import { render } from 'enzyme';
import Avatar from '../Avatar';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('Avatar', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Avatar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders a image Avatar', () => {
    const wrapper = render(<Avatar src="../avatar.png" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-avatar-image')).toBe(true);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('should renders a text Avatar', () => {
    const wrapper = render(<Avatar text="USER" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-avatar-text')).toBe(true);
    expect(wrapper.find('.text')).toHaveLength(1);
  });

  it('should renders a icon Avatar', () => {
    const wrapper = render(<Avatar icon="user" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-avatar-icon')).toBe(true);
    expect(wrapper.find('.icon')).toHaveLength(1);
  });

  it('should renders `radius` prop when passed in', () => {
    const wrapper1 = render(<Avatar radius={4} />);
    const wrapper2 = render(<Avatar radius="10px" />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.attr('style')).toEqual('border-radius:4px');
    expect(wrapper2.attr('style')).toEqual('border-radius:10px');
  });

  it('should renders `srcset` prop when passed in', () => {
    const wrapper = render(
      <Avatar src="../avatar.png" srcset="../avatar2.png" />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').attr('srcset')).toEqual('../avatar2.png');
  });

  it('should renders `alt` prop when passed in', () => {
    const wrapper = render(<Avatar src="../avatar.png" alt="AVATAR" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').attr('alt')).toEqual('AVATAR');
  });

  it('should renders `size` prop when passed in', () => {
    const wrapper1 = render(<Avatar size="small" />);
    const wrapper2 = render(<Avatar size="large" />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-avatar-sm')).toBe(true);
    expect(wrapper2.hasClass('mgt-avatar-lg')).toBe(true);
  });

  injectStyleTestSuites(Avatar);
});
