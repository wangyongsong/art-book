import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';

import './App.global.scss';

export default function App() {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router>
        <Switch>
          {/* <Route path="/:view/:itemId" component={ItemPage} />
          <Route path="/:view" component={HomePage} />
          <Redirect to="/home" /> */}
        </Switch>
      </Router>
    </Suspense>
  );
}
