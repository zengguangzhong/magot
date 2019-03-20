import React from 'react';
import { render } from 'enzyme';
import Button from '../../Button';
import ButtonGroup from '../ButtonGroup';
import { injectTestSuites } from '../../../../test/shared.test';

describe('ButtonGroup', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(
      <ButtonGroup>
        <Button>L</Button>
        <Button>M</Button>
        <Button>R</Button>
      </ButtonGroup>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders empty children', () => {
    const wrapper = render(<ButtonGroup />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('should renders `size` prop when passed in', () => {
    const wrapper = render(
      <Button.Group size="small">
        <Button>L</Button>
        <Button>M</Button>
        <Button>R</Button>
      </Button.Group>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-button-sm')).toHaveLength(3);
  });

  it('should renders `disabled` prop when passed in', () => {
    const wrapper = render(
      <Button.Group disabled={true}>
        <Button>L</Button>
        <Button>M</Button>
        <Button>R</Button>
      </Button.Group>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-button-disabled')).toHaveLength(3);
  });

  injectTestSuites(Button.Group, { backgroundColor: '#f0f0f0' }, true);
});
