import React, { useState } from 'react';
import {
  SettingOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';

import './index.global.scss';
import { Tooltip } from 'antd';

const sideItemList = [
  {
    id: 1,
    icon: <AppstoreOutlined />,
    na: 'AppstoreOutlined',
    placement: 'up',
    // actived: true,
    tooltip: '资源管理',
  },
  {
    id: 2,
    tooltip: 'Star 💕',
    placement: 'up',
    icon: <HeartOutlined className="iconf" />,
  },
  {
    id: 10,
    tooltip: '设置',
    placement: 'down',
    icon: <SettingOutlined className="iconf" />,
  },
];

export default function SideBar() {
  const [isActivedItem, setisActivedItem] = useState(1);

  return (
    <div className="sidebar flexColumn">
      <div className="up flexColumn">
        {sideItemList.map((item) => {
          if (item.placement === 'up') {
            return (
              <Tooltip placement="right" title={item.tooltip} key={item.id}>
                <div
                  className={classnames('iconf', 'flexColumn', {
                    actived: isActivedItem === item.id,
                  })}
                  onClick={() => setisActivedItem(item.id)}
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
              <Tooltip placement="right" title={item.tooltip} key={item.id}>
                <div
                  className={classnames('iconf', {
                    actived: isActivedItem === item.id,
                  })}
                  onClick={() => setisActivedItem(item.id)}
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
