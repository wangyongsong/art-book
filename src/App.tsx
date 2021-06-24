import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './pages/layout';
import Home from './pages/home';
import Setting from './pages/setting';

import './App.global.scss';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/home" />,
          <Route path="/home" component={Home} />
          <Route path="/setting" component={Setting} />
        </Switch>
      </Layout>
    </Router>
  );
}

// console.log(`process`, process);
