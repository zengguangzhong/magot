import React from 'react';
import cx from 'classnames';

import './Carousel.less';

import * as component from '../component';

export interface CarouselProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 是否自动切换
   * @default false
   */
  autoPlay?: boolean;

  /**
   * 自动切换的间隔时长，单位毫秒
   * @default 3000
   */
  interval?: number;

  /**
   * 是否显示指示点
   * @default true
   */
  showDots?: boolean;

  /**
   * 动画效果，slide-滑动, fade-淡变
   * @default slide
   */
  effect?: 'slide' | 'fade';

  children?: React.FunctionComponentElement<CarouselCardProps>[];

  /**
   * 切换后的事件回调函数
   */
  onChange?: (current: number, old: number) => void;
}

interface CarouselCardsProps extends Pick<CarouselProps, 'children'> {
  prefix: string;
  width: number;
  current: number;
  effect: 'slide' | 'fade';
}

export interface CarouselCardProps
  extends component.BaseComponent,
    component.NestedComponent {}

interface CarouselDotsProps {
  count: number;
  prefix: string;
  current: number;
  onSwitch: (index: number) => void;
}

const defaultProps: Partial<CarouselProps> = {
  autoPlay: false,
  interval: 3000,
  showDots: true,
  effect: 'slide',
};

function CarouselCards(props: CarouselCardsProps) {
  const count = React.Children.count(props.children);
  const totalWidth = props.width * count;

  let cards = null;
  if (props.children) {
    cards = React.Children.toArray(props.children).map((card, index) => {
      const isActived = index === props.current;
      return React.cloneElement(card, {
        className: cx(card.props.className, { active: isActived }),
        style: {
          ...card.props.style,
          width: props.width,
          display: !props.width ? 'none' : '',
          left: props.effect === 'fade' ? -index * props.width : 0,
        },
      });
    });
  }

  const style: Record<string, any> = { width: totalWidth };
  if (props.effect === 'slide') {
    const x = -props.current * props.width;
    style.transform = `translate3d(${x}px, 0, 0)`;
  }

  return (
    <ul className={cx(props.prefix + '-cards', props.effect)} style={style}>
      {cards}
    </ul>
  );
}

function CarouselCard(props: CarouselCardProps) {
  const cls = component.getComponentClasses('carousel-card', props);
  return (
    <li className={cls} style={props.style}>
      {props.children}
    </li>
  );
}

function CarouselDots(props: CarouselDotsProps) {
  return (
    <ul className={props.prefix + '-dots'}>
      {Array.from({ length: props.count }).map((_v, i) => {
        const isActived = props.current === i;
        return (
          <li
            className={cx(props.prefix + '-dot', { active: isActived })}
            key={i}>
            <button type="button" onClick={() => props.onSwitch(i)} />
          </li>
        );
      })}
    </ul>
  );
}

function Carousel(props: CarouselProps) {
  const count = React.Children.count(props.children);
  const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [carouselWidth, setCarouselWidth] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleDotSwitch = (index: number) => {
    setCurrentIndex(index);
    props.onChange && props.onChange(index, currentIndex);
  };

  React.useEffect(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      if (width !== carouselWidth) setCarouselWidth(width);
    }
    let timer = 0;
    if (props.autoPlay && (props.interval || 0) > 0) {
      timer = window.setTimeout(() => {
        let index = currentIndex + 1;
        if (index >= count) index = 0;
        handleDotSwitch(index);
      }, props.interval);
    }
    return () => window.clearTimeout(timer);
  });

  const type = 'carousel';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  return (
    <div ref={carouselRef} className={cls}>
      <div className={prefix + '-cardbox'}>
        <CarouselCards
          prefix={prefix}
          width={carouselWidth}
          current={currentIndex}
          effect={props.effect!}>
          {props.children}
        </CarouselCards>
      </div>
      {props.showDots && (
        <CarouselDots
          count={count}
          prefix={prefix}
          current={currentIndex}
          onSwitch={handleDotSwitch}
        />
      )}
    </div>
  );
}

Carousel.defaultProps = defaultProps;
Carousel.Card = CarouselCard;

export default Carousel;
