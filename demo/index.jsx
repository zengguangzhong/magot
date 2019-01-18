import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './index.less';

const demoComponents = {
  AutoComplete: React.lazy(() => import('../src/components/AutoComplete/demo')),
  Avatar: React.lazy(() => import('../src/components/Avatar/demo')),
  Badge: React.lazy(() => import('../src/components/Badge/demo')),
  Breadcrumb: React.lazy(() => import('../src/components/Breadcrumb/demo')),
  Button: React.lazy(() => import('../src/components/Button/demo')),
  ButtonGroup: React.lazy(() => import('../src/components/ButtonGroup/demo')),
  Calendar: React.lazy(() => import('../src/components/Calendar/demo')),
  Card: React.lazy(() => import('../src/components/Card/demo')),
  Carousel: React.lazy(() => import('../src/components/Carousel/demo')),
  Checkbox: React.lazy(() => import('../src/components/Checkbox/demo')),
  CheckboxGroup: React.lazy(() =>
    import('../src/components/CheckboxGroup/demo')
  ),
  Collapse: React.lazy(() => import('../src/components/Collapse/demo')),
  ColorPicker: React.lazy(() => import('../src/components/ColorPicker/demo')),
  ContextMenu: React.lazy(() => import('../src/components/ContextMenu/demo')),
  DatePicker: React.lazy(() => import('../src/components/DatePicker/demo')),
  DateTimePicker: React.lazy(() =>
    import('../src/components/DateTimePicker/demo')
  ),
  Drawer: React.lazy(() => import('../src/components/Drawer/demo')),
  Dropdown: React.lazy(() => import('../src/components/Dropdown/demo')),
  Empty: React.lazy(() => import('../src/components/Empty/demo')),
  FileButton: React.lazy(() => import('../src/components/FileButton/demo')),
  Form: React.lazy(() => import('../src/components/Form/demo')),
  Gallery: React.lazy(() => import('../src/components/Gallery/demo')),
  Icon: React.lazy(() => import('../src/components/Icon/demo')),
  Image: React.lazy(() => import('../src/components/Image/demo')),
  Input: React.lazy(() => import('../src/components/Input/demo')),
  InputNumber: React.lazy(() => import('../src/components/InputNumber/demo')),
  Layout: React.lazy(() => import('../src/components/Layout/demo')),
  List: React.lazy(() => import('../src/components/List/demo')),
  Loading: React.lazy(() => import('../src/components/Loading/demo')),
  Menu: React.lazy(() => import('../src/components/Menu/demo')),
  Modal: React.lazy(() => import('../src/components/Modal/demo')),
  Notification: React.lazy(() => import('../src/components/Notification/demo')),
  Pagination: React.lazy(() => import('../src/components/Pagination/demo')),
  Popover: React.lazy(() => import('../src/components/Popover/demo')),
  Qrcode: React.lazy(() => import('../src/components/Qrcode/demo')),
  Radio: React.lazy(() => import('../src/components/Radio/demo')),
  RadioGroup: React.lazy(() => import('../src/components/RadioGroup/demo')),
  Rate: React.lazy(() => import('../src/components/Rate/demo')),
  Search: React.lazy(() => import('../src/components/Search/demo')),
  Select: React.lazy(() => import('../src/components/Select/demo')),
  Shortcuts: React.lazy(() => import('../src/components/Shortcuts/demo')),
  Slider: React.lazy(() => import('../src/components/Slider/demo')),
  Switch: React.lazy(() => import('../src/components/Switch/demo')),
  Table: React.lazy(() => import('../src/components/Table/demo')),
  Tabs: React.lazy(() => import('../src/components/Tabs/demo')),
  TimePicker: React.lazy(() => import('../src/components/TimePicker/demo')),
  Toast: React.lazy(() => import('../src/components/Toast/demo')),
  Tooltip: React.lazy(() => import('../src/components/Tooltip/demo')),
  Tree: React.lazy(() => import('../src/components/Tree/demo')),
  Uploader: React.lazy(() => import('../src/components/Uploader/demo')),
  VideoPlayer: React.lazy(() => import('../src/components/VideoPlayer/demo')),
};

function Home() {
  const links = [];
  for (const name in demoComponents) {
    links.push(
      <li key={name}>
        <Link to={'/' + name}>{name}</Link>
      </li>
    );
  }
  return <ul>{links}</ul>;
}

function DemoApp() {
  const routes = [];
  for (const name in demoComponents) {
    routes.push(
      <Route key={name} path={'/' + name} component={demoComponents[name]} />
    );
  }
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          {routes}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));
