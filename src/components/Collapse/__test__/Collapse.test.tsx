import React from 'react';
import { render, mount } from 'enzyme';
import Collapse from '../Collapse';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('Collapse', () => {
  const text =
    'This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content, This is panel content.';

  it('should renders dom correctly', () => {
    const wrapper = render(<Collapse />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders have children', () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3" disabled={true}>
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-collapse-panel')).toHaveLength(3);
  });

  it('should renders `active` when pass in', () => {
    const wrapper = render(
      <Collapse active={[0, 1]}>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3">
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-collapse-panel[open]')).toHaveLength(2);
  });

  it('should renders `accordion` is true', () => {
    const wrapper = mount(
      <Collapse accordion={true} active={0}>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3">
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    const panels = wrapper.find('.mgt-collapse-panel');
    const first = panels.first();
    const last = panels.last();
    expect(wrapper).toMatchSnapshot();
    expect(first.render().prop('open')).toEqual(true);
    last.find('summary').simulate('click');
    expect(last.render().prop('open')).toEqual(true);
  });

  it('should renders `bordered` is false', () => {
    const wrapper = render(
      <Collapse bordered={false}>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3">
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.hasClass('mgt-collapse-borderless')).toBe(true);
  });

  it('should simulates change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Collapse active={[0]} onChange={handleChange}>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3">
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    wrapper
      .find('.mgt-collapse-panel')
      .at(2)
      .find('summary')
      .simulate('click');
    expect(handleChange).toBeCalledWith([0, 2]);
  });

  it('should renders `showArrow` is false', () => {
    const wrapper = render(
      <Collapse>
        <Collapse.Panel title="Panel Title1">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2" showArrow={false}>
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('.mgt-collapse-panel')
        .first()
        .find('.mgt-icon')
    ).toHaveLength(1);
    expect(
      wrapper
        .find('.mgt-collapse-panel')
        .last()
        .find('.mgt-icon')
    ).toHaveLength(0);
  });

  it('should renders nested Collapses', () => {
    const wrapper = render(
      <Collapse active={0}>
        <Collapse.Panel title="Panel Title1">
          <Collapse active={0}>
            <Collapse.Panel title="SubPanel Title1">
              <p>{text}</p>
            </Collapse.Panel>
            <Collapse.Panel title="SubPanel Title2">
              <p>{text}</p>
            </Collapse.Panel>
          </Collapse>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title2">
          <p>{text}</p>
        </Collapse.Panel>
        <Collapse.Panel title="Panel Title3">
          <p>{text}</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find('>.mgt-collapse-panel')
        .first()
        .find('.mgt-collapse')
    ).toHaveLength(1);
  });

  injectStyleTestSuites(Collapse);
});
