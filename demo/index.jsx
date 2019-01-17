import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './index.less';

import ButtonDemo from '../src/components/button/demo';
import ButtonGroupDemo from '../src/components/button-group/demo';
import FileButtonDemo from '../src/components/file-button/demo';
import IconDemo from '../src/components/icon/demo';
import CheckboxDemo from '../src/components/checkbox/demo';

function Home() {
  return (
    <ul>
      <li>
        <Link to="/button">Buttton 按钮</Link>
      </li>
      <li>
        <Link to="/button-group">ButttonGroup 按钮组</Link>
      </li>
      <li>
        <Link to="/file-button">FileButton 文件按钮</Link>
      </li>
      <li>
        <Link to="/icon">Icon 图标</Link>
      </li>
      <li>
        <Link to="/checkbox">Checkbox 复选按钮</Link>
      </li>
    </ul>
  );
}

function DemoApp() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/button" component={ButtonDemo} />
        <Route path="/button-group" component={ButtonGroupDemo} />
        <Route path="/file-button" component={FileButtonDemo} />
        <Route path="/icon" component={IconDemo} />
        <Route path="/checkbox" component={CheckboxDemo} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));
