import React from 'react';
import { render } from 'enzyme';
import Empty from '../Empty';
import Button from '../../Button';
import { injectStyleTestSuites } from '../../../../test/shared.test';

describe('Empty', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<Empty />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should renders `image` and `imageStyle` props when pass in', () => {
    const image =
      'https://oss3.rabbitpre.com/spa/img/6237031221cdb5b0eab70443c546cb79.png';
    const wrapper = render(
      <Empty image={image} imageStyle={{ height: 250 }} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').attr('src')).toEqual(image);
    expect(wrapper.find('.mgt-empty-image').attr('style')).toEqual(
      'height:250px'
    );
  });

  it('should renders `tips` and `tipsStyle` props when pass in', () => {
    const tips = '您目前没有创建任何游戏';
    const wrapper = render(
      <Empty tips="您目前没有创建任何游戏" tipsStyle={{ color: '#999' }} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-empty-tips').text()).toEqual(tips);
    expect(wrapper.find('.mgt-empty-tips').attr('style')).toEqual('color:#999');
  });

  it('should renders image hidden', () => {
    const wrapper = render(<Empty imageVisible={false} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-empty-image')).toHaveLength(0);
  });

  it('should renders non-tips', () => {
    const wrapper = render(<Empty tips="" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-empty-tips')).toHaveLength(0);
  });

  it('should renders have children', () => {
    const wrapper = render(
      <Empty>
        <Button type="primary" icon="plus">
          新建游戏
        </Button>
      </Empty>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.mgt-button')).toHaveLength(1);
  });

  injectStyleTestSuites(Empty);
});
