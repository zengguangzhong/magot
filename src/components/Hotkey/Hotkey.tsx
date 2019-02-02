import React from 'react';

import * as component from '../component';
import { isEditableNode } from '../../utils/node';

export interface HotkeyData {
  key: number;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  name?: string;
  description?: string;
}

export interface HotkeyProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 热键是否是激活状态，非激活状态，不处理按键事件
   * @default false
   */
  active?: boolean;

  /**
   * 热键配置列表
   * @default []
   */
  hotkeys?: HotkeyData[];

  /**
   * 热键命中，触发回调
   */
  onTrigger?: (data: HotkeyData) => void;
}

const defaultProps: Partial<HotkeyProps> = {
  active: false,
  hotkeys: [],
};

function Hotkey(props: HotkeyProps) {
  const hotkeys = props.hotkeys || [];
  const hanldeKeyDown = (evt: KeyboardEvent) => {
    if (!props.active) return;

    if (isEditableNode(evt.target as Node)) {
      evt.stopPropagation();
      return;
    }

    const keyCode = evt.keyCode || evt.which;
    const { ctrlKey, shiftKey, metaKey } = evt;

    for (const item of hotkeys) {
      if (!item) continue;

      if (item.key !== keyCode) continue;

      if ((ctrlKey && !item.ctrlKey) || (item.ctrlKey && !ctrlKey)) {
        continue;
      }

      if ((shiftKey && !item.shiftKey) || (item.shiftKey && !shiftKey)) {
        continue;
      }

      if ((metaKey && !item.metaKey) || (item.metaKey && !metaKey)) {
        continue;
      }

      evt.preventDefault();
      evt.stopPropagation();
      props.onTrigger && props.onTrigger(item);
      break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', hanldeKeyDown, false);
    return () => document.removeEventListener('keydown', hanldeKeyDown);
  });

  return React.Children.only(props.children);
}

Hotkey.defaultProps = defaultProps;

export default Hotkey;
