import React from 'react';
import Platform from './components/platform';
import ResourceManager from './components/resourceManager';
import ResourceSeeting from './components/resourceSeeting';
import './home.global.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="platform">
        <Platform />
      </div>
      <div className="resourceManager">
        <ResourceManager />
      </div>
      <div className="resourceSeeting">
        <ResourceSeeting />
      </div>
    </div>
  );
};

export default Home;
