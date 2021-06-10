import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Spin } from 'antd';
import Layout from './pages/layout';
// import Home from './pages/home';
// import About from './pages/about';
import './App.global.scss';

export default function App() {
  return (
    <Layout />
    // <Suspense fallback={<Spin size="large" className="layout__loading" />}>
    //   <Router>
    //     <Switch>
    //       <Route path="/" component={Layout} />
    //       {/* <Route path="/about" component={About} /> */}
    //       <Redirect to="/" />
    //     </Switch>
    //   </Router>
    // </Suspense>
  );
}
