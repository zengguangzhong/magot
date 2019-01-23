import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loading from '../src/components/Loading';

import './index.less';

const demoComponents = {};
if (__DEMOS__ && Array.isArray(__DEMOS__)) {
  for (const demo of __DEMOS__) {
    demoComponents[demo] = React.lazy(() => {
      return import('../src/components/' + demo + '/demo.tsx');
    });
  }
}

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
