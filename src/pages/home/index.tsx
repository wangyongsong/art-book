import React, { useRef } from 'react';
// import Platform from './components/platform';
import ResourceManager from './components/resourceManager';
import ResourceSeeting from './components/resourceSeeting';
import './home.global.scss';

const Home = () => {
  const ref = useRef(null);

  return (
    <div className="home">
      {/* <div className="platform">
        <Platform />
      </div> */}
      <div className="resourceManager">
        <ResourceManager oRef={ref} />
      </div>
      <div className="resourceSeeting">
        <ResourceSeeting oRef={ref} />
      </div>
    </div>
  );
};

export default Home;
