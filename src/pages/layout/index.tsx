import React from 'react';
import SideBar from '../../components/Sidebar';

import './index.global.scss';

interface Props {
  children?: JSX.Element[] | JSX.Element | React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <section className="layout">
      <SideBar />
      <section className="container">
        {/* <div id="header">
          <Header />
        </div> */}
        <div id="main">{children}</div>
      </section>
    </section>
  );
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
