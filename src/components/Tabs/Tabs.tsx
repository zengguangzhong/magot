import React, { ReactNode } from 'react';

import TabPane, { TabPaneProps } from './TabPane';
import Iconable from '../Icon/Iconable';
import * as component from '../component';

import './Tabs.less';

export type TabsMode = 'column' | 'row';

export interface TabsProps extends component.BaseComponent {
  /**
   * 当前被激活的tab（每个tab都必须指定一个名称），
   * 默认第一个tab
   */
  activedName?: string;

  /**
   * TabPane列表
   */
  children: Array<React.ReactElement<TabPaneProps>>;

  /**
   * 显示模式，可选值：`column`-纵向排列, `row`-横向排列，默认值`column`
   * @default column
   */
  mode?: TabsMode;

  /**
   * 切换tab的回调函数
   */
  onChange?: (tabName: string) => void;
}

interface TabNavItemProps
  extends component.DisableComponent,
    component.IconableComponent {
  name: string;
  label?: string | ReactNode;
  actived?: boolean;
  onActive?: (tabName: string) => void;
}

interface TabPaneItemProps {
  name: string;
  actived?: boolean;
  children?: React.ReactNode;
}

const TabNavItem = React.forwardRef(
  (props: TabNavItemProps, ref?: React.Ref<HTMLLIElement>) => {
    const cls = component.getComponentClasses(
      'tabs-nav-item',
      props,
      props.name,
      {
        active: !!props.actived,
      }
    );
    const handleActive = (evt: React.MouseEvent<HTMLLIElement>) => {
      evt.stopPropagation();
      props.onActive && props.onActive(props.name);
    };
    return (
      <li ref={ref} role="tab" className={cls} onClick={handleActive}>
        <Iconable
          name={props.icon}
          position={props.iconPosition}
          size={props.iconSize}>
          <span className="label">{props.label}</span>
        </Iconable>
      </li>
    );
  }
);

function TabPaneItem(props: TabPaneItemProps) {
  const type = 'tabs-pane-item';
  const cls = component.getComponentClasses(type, {}, props.name, {
    active: !!props.actived,
  });
  return (
    <li role="tabpane" className={cls}>
      {props.children}
    </li>
  );
}

const defaultProps: Partial<TabsProps> = {
  mode: 'column',
};

function Tabs(props: TabsProps) {
  const { navs, panes } = parseChildren(props.children);
  const isColumn = props.mode === 'column';

  let initialActivedName = props.activedName;
  if (!initialActivedName && navs.length > 0) {
    initialActivedName = navs[0].name;
  }

  const activedTabRef = React.useRef<HTMLLIElement>(null);
  const [activedName, setActivedName] = React.useState(initialActivedName);
  const [activeBarThickness, setActiveBarThickness] = React.useState(0);
  const [activeBarTranslate, setActiveBarTranslate] = React.useState(0);

  React.useEffect(() => {
    const activedTab = activedTabRef.current;
    if (activedTab) {
      const thickness = isColumn
        ? activedTab.offsetWidth
        : activedTab.offsetHeight;
      const translate = isColumn ? activedTab.offsetLeft : activedTab.offsetTop;
      setActiveBarThickness(thickness);
      setActiveBarTranslate(translate);
    }
  }, [activedName]);

  const handleTabNavActive = (tabName: string) => {
    if (tabName === activedName) return;
    setActivedName(tabName);
    props.onChange && props.onChange(tabName);
  };

  const type = 'tabs';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props, {
    [`${prefix}-${props.mode}`]: !!props.mode,
  });

  const activeBarStyle: Record<string, any> = {
    width: activeBarThickness,
    transform: `translateX(${activeBarTranslate}px)`,
  };
  if (!isColumn) {
    activeBarStyle.width = undefined;
    activeBarStyle.height = activeBarThickness;
    activeBarStyle.transform = `translateY(${activeBarTranslate}px)`;
  }

  return (
    <div className={cls} style={props.style}>
      <div className={component.getComponentClasses('tabs-nav-wrap')}>
        <ul
          role="tablist"
          className={component.getComponentClasses('tabs-nav-list')}>
          {navs.map((item, index) => {
            const actived = item.name === activedName;
            return (
              <TabNavItem
                key={index}
                ref={actived ? activedTabRef : null}
                actived={actived}
                onActive={handleTabNavActive}
                {...item}
              />
            );
          })}
        </ul>
        <div
          className={component.getComponentClasses('tabs-nav-active-bar')}
          style={activeBarStyle}
        />
      </div>
      <ul
        role="tabpanelist"
        className={component.getComponentClasses('tabs-pane-list')}>
        {panes.map((pane, index) => {
          const actived = pane.name === activedName;
          return (
            <TabPaneItem key={index} actived={actived} {...pane}>
              {pane.children}
            </TabPaneItem>
          );
        })}
      </ul>
    </div>
  );
}

Tabs.defaultProps = defaultProps;
Tabs.Panel = TabPane;

function parseChildren(children: Array<React.ReactElement<TabPaneProps>>) {
  const navs: TabNavItemProps[] = [];
  const panes: TabPaneItemProps[] = [];
  React.Children.forEach(children, child => {
    const { children, ...navProps } = child.props;
    panes.push({ name: navProps.name, children });
    navs.push(navProps);
  });
  return { navs, panes };
}

export default Tabs;
