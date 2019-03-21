import React from 'react';
import { render, shallow } from 'enzyme';
import Button from '../Button';
import {
  injectStyleTestSuites,
  injectClickEventTestSuite,
} from '../../../../test/shared.test';

describe('Button', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Button />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders a `button` Button', () => {
    const btn = <Button>Button</Button>;
    const wrapper1 = shallow(btn);
    expect(wrapper1.name()).toEqual('NativeButton');

    const wrapper2 = render(btn);
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper2.attr('type')).toEqual('button');
  });

  it('should renders a `link` Button', () => {
    const link = (
      <Button href="https://github.com/billjs/magot" target="_blank">
        Link
      </Button>
    );
    const wrapper1 = shallow(link);
    expect(wrapper1.name()).toEqual('LinkButton');

    const wrapper2 = render(link);
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper2.attr('href')).toEqual('https://github.com/billjs/magot');
    expect(wrapper2.attr('target')).toEqual('_blank');
  });

  it('should renders children when passed in', () => {
    let wrapper = render(<Button>This is a Button</Button>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toEqual('This is a Button');

    wrapper = render(
      <Button>
        <span>Button</span>
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text()).toEqual('Button');

    wrapper = render(<Button href="#/home">Link</Button>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toEqual('Link');

    wrapper = render(
      <Button href="#/home">
        <span>Home</span>
      </Button>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text()).toEqual('Home');
  });

  it('should renders `type` prop when passed in', () => {
    let wrapper1 = render(<Button type="primary">Primary</Button>);
    let wrapper2 = render(
      <Button href="#" type="primary">
        Primary
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-primary')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-primary')).toBe(true);

    wrapper1 = render(<Button type="success">Success</Button>);
    wrapper2 = render(
      <Button href="#" type="success">
        Success
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-success')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-success')).toBe(true);

    wrapper1 = render(<Button type="warning">Warning</Button>);
    wrapper2 = render(
      <Button href="#" type="warning">
        Warning
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-warning')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-warning')).toBe(true);

    wrapper1 = render(<Button type="danger">Danger</Button>);
    wrapper2 = render(
      <Button href="#" type="danger">
        Danger
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-danger')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-danger')).toBe(true);

    wrapper1 = render(<Button type="text">Text</Button>);
    wrapper2 = render(
      <Button href="#" type="text">
        Text
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-text')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-text')).toBe(true);

    wrapper1 = render(<Button type="link">Link</Button>);
    wrapper2 = render(
      <Button href="#" type="link">
        Link
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-link')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-link')).toBe(true);
  });

  it('should renders `size` prop when passed in', () => {
    let wrapper1 = render(<Button size="small">Small</Button>);
    let wrapper2 = render(
      <Button href="#" size="small">
        Small
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-sm')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-sm')).toBe(true);

    wrapper1 = render(<Button size="large">Large</Button>);
    wrapper2 = render(
      <Button href="#" size="large">
        Large
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-lg')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-lg')).toBe(true);
  });

  it('should renders `disabled` prop when passed in', () => {
    const wrapper1 = render(<Button disabled={true}>Disabled</Button>);
    const wrapper2 = render(
      <Button href="#" disabled={true}>
        Disabled
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-disabled')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-disabled')).toBe(true);
    expect(wrapper1.attr('disabled')).toEqual('disabled');
  });

  it('should renders `block` prop when passed in', () => {
    const wrapper1 = render(<Button block={true}>Block</Button>);
    const wrapper2 = render(
      <Button href="#" block={true}>
        Block
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-block')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-block')).toBe(true);
  });

  it('should renders `circular` prop when passed in', () => {
    const wrapper1 = render(<Button circular={true} />);
    const wrapper2 = render(<Button href="#" circular={true} />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-circular')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-circular')).toBe(true);
  });

  it('should renders `square` prop when passed in', () => {
    const wrapper1 = render(<Button square={true} />);
    const wrapper2 = render(<Button href="#" square={true} />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.hasClass('mgt-button-square')).toBe(true);
    expect(wrapper2.hasClass('mgt-button-square')).toBe(true);
  });

  it('should renders with icon', () => {
    let wrapper1 = render(<Button icon="download">Icon Button</Button>);
    let wrapper2 = render(
      <Button href="#" icon="download">
        Icon Button
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.find('.mgt-icon')).toHaveLength(1);
    expect(wrapper2.find('.mgt-icon')).toHaveLength(1);

    wrapper1 = render(
      <Button icon="download" iconPosition="right">
        Icon Button
      </Button>
    );
    wrapper2 = render(
      <Button href="#" icon="download" iconPosition="right">
        Icon Button
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.find('.mgt-icon').hasClass('right')).toBe(true);
    expect(wrapper2.find('.mgt-icon').hasClass('right')).toBe(true);

    wrapper1 = render(
      <Button icon="download" iconSize={20}>
        Icon Button
      </Button>
    );
    wrapper2 = render(
      <Button href="#" icon="download" iconSize={20}>
        Icon Button
      </Button>
    );
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });

  it('should renders `loading` prop when passed in', () => {
    const wrapper1 = render(<Button loading={true} />);
    const wrapper2 = render(<Button href="#" loading={true} />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper1.find('.mgt-icon-loading.spin')).toHaveLength(1);
    expect(wrapper2.find('.mgt-icon-loading.spin')).toHaveLength(1);
  });

  it('should renders `htmlType` prop when passed in', () => {
    const wrapper = render(<Button htmlType="submit">Button</Button>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.attr('type')).toEqual('submit');
  });

  injectStyleTestSuites(Button);
  injectClickEventTestSuite(Button);
});
