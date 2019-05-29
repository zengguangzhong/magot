import React from 'react';
import { render, mount } from 'enzyme';
import Carousel from '../Carousel';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('Carousel', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Carousel />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders have children', () => {
    const wrapper = render(
      <Carousel>
        <Carousel.Card>
          <h3>1</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>2</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>3</h3>
        </Carousel.Card>
      </Carousel>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-carousel-card')).toHaveLength(3);
  });

  it('should renders `autoPlay` when pass in', () => {
    const wrapper = render(
      <Carousel autoPlay={true}>
        <Carousel.Card>
          <h3>1</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>2</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>3</h3>
        </Carousel.Card>
      </Carousel>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders `showDots` is false', () => {
    const wrapper = render(
      <Carousel showDots={false}>
        <Carousel.Card>
          <h3>1</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>2</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>3</h3>
        </Carousel.Card>
      </Carousel>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-carousel-dots')).toHaveLength(0);
  });

  it('should renders `effect` when pass in', () => {
    const wrapper = render(
      <Carousel effect="fade">
        <Carousel.Card>
          <h3>1</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>2</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>3</h3>
        </Carousel.Card>
      </Carousel>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-carousel-cards.fade')).toHaveLength(1);
  });

  it('should simulates change event', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Carousel onChange={handleChange}>
        <Carousel.Card>
          <h3>1</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>2</h3>
        </Carousel.Card>
        <Carousel.Card>
          <h3>3</h3>
        </Carousel.Card>
      </Carousel>
    );
    wrapper
      .find('.mgt-carousel-dot')
      .at(2)
      .find('button')
      .simulate('click');
    expect(handleChange).toBeCalledWith(2, 0);
  });

  injectStyleTestSuites(Carousel);
});
