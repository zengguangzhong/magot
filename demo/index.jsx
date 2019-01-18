import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './index.less';

import ButtonDemo from '../src/components/Button/demo';
import ButtonGroupDemo from '../src/components/ButtonGroup/demo';
import FileButtonDemo from '../src/components/FileButton/demo';
import IconDemo from '../src/components/Icon/demo';
import CheckboxDemo from '../src/components/Checkbox/demo';

function Home() {
  return (
    <ul>
      <li>
        <Link to="/Button">Buttton 按钮</Link>
      </li>
      <li>
        <Link to="/ButtonGroup">ButttonGroup 按钮组</Link>
      </li>
      <li>
        <Link to="/FileButton">FileButton 文件按钮</Link>
      </li>
      <li>
        <Link to="/Icon">Icon 图标</Link>
      </li>
      <li>
        <Link to="/Checkbox">Checkbox 复选按钮</Link>
      </li>
    </ul>
  );
}

function DemoApp() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/Button" component={ButtonDemo} />
        <Route path="/ButtonGroup" component={ButtonGroupDemo} />
        <Route path="/FileButton" component={FileButtonDemo} />
        <Route path="/Icon" component={IconDemo} />
        <Route path="/Checkbox" component={CheckboxDemo} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));
