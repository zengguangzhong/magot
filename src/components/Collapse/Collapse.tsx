import React from 'react';

import Icon from '../Icon';
import * as component from '../component';

import './Collapse.less';

export interface CollapseProps
  extends component.BaseComponent,
    component.NestedComponent {
  /**
   * 激活展开的面板，当是手风琴模式时，只能展开一个面板
   */
  active?: number | number[];

  /**
   * 是否是手风琴模式的折叠面板，同时只能展开一个面板
   * @default false
   */
  accordion?: boolean;

  /**
   * 带边框的折叠面板
   * @default true
   */
  bordered?: boolean;

  /**
   * 折叠面板列表
   */
  children?: React.FunctionComponentElement<CollapsePanelProps>[];

  /**
   * 切换面板后的回调函数
   */
  onChange?: (panels: number[]) => void;
}

export interface CollapsePanelProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 面板标题
   */
  title: string;

  /**
   * 是否显示面板上的箭头图标
   */
  showArrow?: boolean;

  /**
   * 是否展开该面板
   */
  open?: boolean;

  /**
   * 面板展开事件回调函数
   */
  onOpen?: () => void;

  /**
   * 面板收起事件回调函数
   */
  onClose?: () => void;
}

const defaultProps: Partial<CollapseProps> = {
  bordered: true,
  accordion: false,
};

const defaultPanelProps: Partial<CollapsePanelProps> = {
  ...component.getDefaultDisabledProps(),
  showArrow: true,
};

function CollapsePanel(props: CollapsePanelProps) {
  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const detailsNode = e.currentTarget.parentNode;
    if (!detailsNode) return;
    const open = (detailsNode as HTMLDetailsElement).open;
    const cb = open ? props.onClose : props.onOpen;
    cb && cb();
  };

  const type = 'collapse-panel';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  return (
    <details className={cls} style={props.style} open={props.open}>
      <summary className={prefix + '-header'} onClick={handleToggle}>
        {props.showArrow && <Icon name="caret" />}
        <h4 className="title">{props.title}</h4>
      </summary>
      <section className={prefix + '-content'}>{props.children}</section>
    </details>
  );
}

CollapsePanel.defaultProps = defaultPanelProps;

function Collapse(props: CollapseProps) {
  const children = React.Children.toArray(props.children || []);

  const active = props.active;
  let activeds =
    active !== void 0 ? (Array.isArray(active) ? active : [active]) : [];
  activeds = activeds.filter(i => !children[i].props.disabled);

  const [activedPanels, setActivedPanels] = React.useState(activeds);

  const changeActivedPanels = (panels: number[]) => {
    setActivedPanels(panels);
    props.onChange && props.onChange(panels);
  };

  const handlePanelOpen = (index: number) => {
    const panels = props.accordion ? [index] : [...activedPanels, index];
    changeActivedPanels(panels);
  };

  const handlePanelClose = (index: number) => {
    if (props.accordion) {
      changeActivedPanels([]);
      return;
    }
    const panels = activedPanels.filter(p => p !== index);
    changeActivedPanels(panels);
  };

  let panels = children.map((panel, index) => {
    return React.cloneElement(panel, {
      open: activedPanels.includes(index),
      onOpen: () => {
        handlePanelOpen(index);
        panel.props.onOpen && panel.props.onOpen();
      },
      onClose: () => {
        handlePanelClose(index);
        panel.props.onClose && panel.props.onClose();
      },
    });
  });

  const prefix = component.getComponentClasses('collapse');
  const cls = component.getComponentClasses('collapse', props, {
    [prefix + '-borderless']: !props.bordered,
  });

  return (
    <div className={cls} style={props.style}>
      {panels}
    </div>
  );
}

Collapse.defaultProps = defaultProps;
Collapse.Panel = CollapsePanel;

export default Collapse;
