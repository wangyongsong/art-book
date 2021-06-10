import React from 'react';
import routes from '../../router/config';
import './index.global.scss';

export default function SideBar() {
  return (
    <div className="sidebar">
      {routes &&
        routes[0].children.map((item: any) => {
          return <span key={item.meta.title}>{item.meta.title}</span>;
        })}
    </div>
  );
}
