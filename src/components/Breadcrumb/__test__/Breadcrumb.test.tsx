import React from 'react';
import { render } from 'enzyme';
import Breadcrumb from '../Breadcrumb';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('Breadcrumb', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">User</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Template</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Editor</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Workbench</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders empty children', () => {
    const wrapper = render(<Breadcrumb />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('should renders breadcrumb items', () => {
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">User</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Template</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Editor</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Workbench</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper.find('.mgt-breadcrumb-item')).toHaveLength(5);
  });

  it('should renders a breadcrumb item', () => {
    let wrapper = render(<Breadcrumb.Item>Home</Breadcrumb.Item>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toEqual('Home');
    expect(wrapper.find('.mgt-breadcrumb-separator')).toHaveLength(1);

    wrapper = render(
      <Breadcrumb.Item>
        <a href="">User</a>
      </Breadcrumb.Item>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('.mgt-breadcrumb-separator')).toHaveLength(1);
  });

  it('should renders `separator` prop when passed in', () => {
    const wrapper = render(
      <Breadcrumb separator="&gt;">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">User</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Template</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Editor</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Workbench</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-breadcrumb-separator').text()).toEqual('>>>>>');
  });

  injectStyleTestSuites(Breadcrumb);
});
