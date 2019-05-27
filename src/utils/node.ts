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

  let top = 0;
  let left = 0;

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

/**
 *
 *
 * @export
 * @param {Node} node
 * @returns {boolean}
 */
export function isEditableNode(node: Node) {
  const inputableNodes = ['INPUT', 'TEXTAREA'];
  if (!(node instanceof HTMLElement)) return false;
  const editable = node.contentEditable;
  return inputableNodes.includes(node.nodeName) || editable === 'true';
}

/**
 * 通过影子渲染的方式获得文本的渲染后大小
 *
 * @export
 * @param {string} text 文本内容
 * @param {(Node | null)} [parent] 渲染到的父级容器节点
 * @param {CSSStyleDeclaration} [styles] 文本的样式
 * @returns {{ width: number, height: number }}
 */
export function getShallowTextSize(
  text: string,
  parent?: Node | null,
  styles?: CSSStyleDeclaration
) {
  const container = parent || document.body;
  const node = document.createElement('span');
  node.textContent = text;
  node.style.visibility = 'hidden';
  if (styles) {
    for (const key in styles) {
      node.style[key] = styles[key];
    }
  }
  container.appendChild(node);
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  container.removeChild(node);
  return { width, height };
}
