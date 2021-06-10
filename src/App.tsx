import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './pages/layout';
import Home from './pages/home';
import About from './pages/about';

import './App.global.scss';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Redirect exact from="/" to="/home" />,
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Layout>
    </Router>
  );
}
