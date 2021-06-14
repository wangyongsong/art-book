import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  SettingOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';

import './index.global.scss';

type SideItem = {
  id: number;
  placement: string;
  tooltip: string;
  path?: string;
  icon?: any;
};

const sideItemList: SideItem[] = [
  {
    id: 1,
    placement: 'up',
    tooltip: '资源管理',
    path: '/home',
    icon: <AppstoreOutlined />,
  },
  {
    id: 2,
    tooltip: 'Star 💕',
    placement: 'up',
    icon: <HeartOutlined />,
  },
  {
    id: 10,
    tooltip: '设置',
    placement: 'down',
    path: '/about',
    icon: <SettingOutlined />,
  },
];

export default function SideBar() {
  const history = useHistory();

  const [isActivedItem, setisActivedItem] = useState(1);

  const isActived = (item: SideItem) => {
    const { pathname } = history.location;
    setisActivedItem(item.id);
    if (item.path && history.push && pathname !== item.path) {
      history.push(item.path);
    }
  };

  useEffect(() => {
    const { pathname } = history.location;
    const isAct = sideItemList.filter(
      (item: SideItem) => item.path === pathname
    );
    setisActivedItem(isAct[0].id);
  }, []);

  return (
    <div className="sidebar flexColumn">
      <div className="up flexColumn">
        {sideItemList.map((item) => {
          if (item.placement === 'up') {
            return (
              <Tooltip
                placement="right"
                title={item.tooltip}
                key={item.id}
                mouseLeaveDelay={0.05}
              >
                <div
                  className={classnames('iconf', 'flexColumn', {
                    actived: isActivedItem === item.id,
                  })}
                  onClick={() => isActived(item)}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
              </Tooltip>
            );
          }
          return null;
        })}
      </div>
      <div className="down">
        {sideItemList.map((item) => {
          if (item.placement === 'down') {
            return (
              <Tooltip
                placement="right"
                title={item.tooltip}
                key={item.id}
                mouseLeaveDelay={0.05}
              >
                <div
                  className={classnames('iconf', 'flexColumn', {
                    actived: isActivedItem === item.id,
                  })}
                  onClick={() => isActived(item)}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
              </Tooltip>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
