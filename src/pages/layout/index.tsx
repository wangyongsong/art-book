import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import Header from '../../components/Header';
import Home from '../home';
import About from '../about';

import './index.global.scss';

const Layout = () => {
  return (
    <section className="layout">
      <SideBar />
      <section className="container">
        <Header />
        <div>
          <Router>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </div>
      </section>
    </section>
  );
};

export default Layout;
