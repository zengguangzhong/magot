import React from 'react';
import { render } from 'enzyme';
import Icon from '../Icon';
import {
  injectStyleTestSuites,
  injectClickEventTestSuite,
} from '../../../../test/shared.test';

describe('Icon', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Icon />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders `.mgt-icon` className', () => {
    const wrapper = render(<Icon />);
    expect(wrapper.hasClass('mgt-icon')).toEqual(true);
  });

  it('should renders `name` prop when passed in', () => {
    const wrapper = render(<Icon name="home" />);
    expect(wrapper.hasClass('mgt-icon-home')).toEqual(true);
  });

  it('should renders `spin` prop when passed in', () => {
    const wrapper = render(<Icon spin={true} />);
    expect(wrapper.hasClass('spin')).toEqual(true);
  });

  it('should renders `size` prop when passed in', () => {
    const wrapper = render(<Icon size={28} />);
    expect(wrapper).toMatchSnapshot();
  });

  injectStyleTestSuites(Icon);
  injectClickEventTestSuite(Icon);
});
