import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loading from '../src/components/Loading';

import './index.less';

type DEMO_Component = {
  name: string;
  done: boolean;
  cmp: React.LazyExoticComponent<React.ComponentType<any>>;
};

const demoComponents: Record<string, DEMO_Component> = {};
if (__DEMOS__ && Array.isArray(__DEMOS__)) {
  for (const demo of __DEMOS__) {
    const cmp = React.lazy(() => {
      return import('../src/components/' + demo.name + '/demo.tsx');
    });
    demoComponents[demo.name] = { ...demo, cmp };
  }
}

function Home() {
  const links = [];
  for (const key in demoComponents) {
    const item = demoComponents[key];
    links.push(
      <li key={item.name}>
        <input
          type="checkbox"
          defaultChecked={item.done}
          disabled={true}
          style={{ marginRight: 12 }}
        />
        <Link to={'/' + item.name}>{item.name}</Link>
      </li>
    );
  }
  return <ul style={{ listStyle: 'none' }}>{links}</ul>;
}

function DemoApp() {
  const routes = [];
  for (const key in demoComponents) {
    const item = demoComponents[key];
    routes.push(
      <Route key={item.name} path={'/' + item.name} component={item.cmp} />
    );
  }
  return (
    <Router>
      <React.Suspense fallback={<Loading tip="LOADING..." />}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          {routes}
        </Switch>
      </React.Suspense>
    </Router>
  );
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));
