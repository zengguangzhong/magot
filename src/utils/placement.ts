export type Placement =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

function getViewportClient() {
  const root = document.documentElement;
  return {
    width: root.clientWidth,
    height: root.clientHeight,
    left: root.scrollLeft,
    top: root.scrollTop,
  };
}

export function getAdjustment(space = 0) {
  return {
    left(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left -= size.width + space;
      const vp = getViewportClient();
      return left - vp.left > 0 ? 'left' : 'right';
    },

    top(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top -= size.height + space;
      const vp = getViewportClient();
      return top - vp.top > 0 ? 'top' : 'bottom';
    },

    right(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left += target.size.width + space;
      const vp = getViewportClient();
      return left + size.width - vp.left < vp.width ? 'right' : 'left';
    },

    bottom(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top += target.size.height + space;
      const vp = getViewportClient();
      return top + size.height - vp.top < vp.height ? 'bottom' : 'top';
    },

    leftTop(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left -= size.width + space;
      const vp = getViewportClient();
      return left - vp.left > 0 ? 'leftTop' : 'rightTop';
    },

    leftBottom(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left -= size.width + space;
      const vp = getViewportClient();
      return left - vp.left > 0 ? 'leftBottom' : 'rightBottom';
    },

    topLeft(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top -= size.height + space;
      const vp = getViewportClient();
      return top - vp.top > 0 ? 'topLeft' : 'bottomLeft';
    },

    topRight(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top -= size.height + space;
      const vp = getViewportClient();
      return top - vp.top > 0 ? 'topRight' : 'bottomRight';
    },

    rightTop(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left += target.size.width + space;
      const vp = getViewportClient();
      return left + size.width - vp.left < vp.width ? 'rightTop' : 'leftTop';
    },

    rightBottom(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      left += target.size.width + space;
      const vp = getViewportClient();
      return left + size.width - vp.left < vp.width
        ? 'rightBottom'
        : 'leftBottom';
    },

    bottomLeft(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top += target.size.height + space;
      const vp = getViewportClient();
      return top + size.height - vp.top < vp.height ? 'bottomLeft' : 'topLeft';
    },

    bottomRight(size: Size, target: { size: Size; offset: Offset }) {
      let top = target.offset.top;
      top += target.size.height + space;
      const vp = getViewportClient();
      return top + size.height - vp.top < vp.height
        ? 'bottomRight'
        : 'topRight';
    },
  };
}

export function getPlacement(space = 0) {
  return {
    left(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= size.width + space;
      top -= (size.height - target.size.height) / 2;
      return { left, top: Math.round(top) };
    },

    top(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= (size.width - target.size.width) / 2;
      top -= size.height + space;
      return { left: Math.round(left), top };
    },

    right(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left += target.size.width + space;
      top -= (size.height - target.size.height) / 2;
      return { left, top: Math.round(top) };
    },

    bottom(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= (size.width - target.size.width) / 2;
      top += target.size.height + space;
      return { left: Math.round(left), top };
    },

    leftTop(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= size.width + space;
      return { left, top };
    },

    leftBottom(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= size.width + space;
      top -= size.height - target.size.height;
      return { left, top };
    },

    topLeft(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      top -= size.height + space;
      return { left, top };
    },

    topRight(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= size.width - target.size.width;
      top -= size.height + space;
      return { left, top };
    },

    rightTop(size: Size, target: { size: Size; offset: Offset }) {
      size.width;
      let left = target.offset.left;
      let top = target.offset.top;
      left += target.size.width + space;
      return { left, top };
    },

    rightBottom(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left += target.size.width + space;
      top -= size.height - target.size.height;
      return { left, top };
    },

    bottomLeft(size: Size, target: { size: Size; offset: Offset }) {
      size.height;
      let left = target.offset.left;
      let top = target.offset.top;
      top += target.size.height + space;
      return { left, top };
    },

    bottomRight(size: Size, target: { size: Size; offset: Offset }) {
      let left = target.offset.left;
      let top = target.offset.top;
      left -= size.width - target.size.width;
      top += target.size.height + space;
      return { left, top };
    },
  };
}
