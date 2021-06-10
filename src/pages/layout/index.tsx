import React from 'react';
import SideBar from '../../components/Sidebar';
import Header from '../../components/Header';

import './index.global.scss';

const Home = () => {
  return (
    <section className="layout">
      <SideBar />
      <section className="container">
        <Header />
        <div>body</div>
      </section>
    </section>
  );
};

export default Home;
