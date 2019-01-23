/**
 *
 *
 * @export
 * @param {(Element | null)} node
 * @param {(Element | null)} [container]
 * @returns
 */
export function offset(node: Element | null, container?: Element | null) {
  if (!node) return null;

  let top: number = 0;
  let left: number = 0;

  do {
    top += (node as HTMLElement).offsetTop;
    left += (node as HTMLElement).offsetLeft;
    node = (node as HTMLElement).offsetParent;
  } while (node);

  if (container) {
    const containerOffset = offset(container);
    if (containerOffset) {
      left -= containerOffset.left;
      top -= containerOffset.top;
    }
  }

  return { top, left };
}
