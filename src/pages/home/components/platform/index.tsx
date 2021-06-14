import React from 'react';
import { Avatar, Typography } from 'antd';

import './platform.global.scss';
import smmsLogo from '../../../../assets/logo/smms-logo.png';
import githubLogo from '../../../../assets/logo/github-logo.png';
import giteeLogo from '../../../../assets/logo/gitee-logo.png';
import qiniuLogo from '../../../../assets/logo/qiniu-logo.png';

const { Text } = Typography;

const Platform = () => {
  const data = [
    {
      title: 'SM.MS',
      desc: '5G容量免费',
      avatar: smmsLogo,
    },
    {
      title: 'GitHub',
      desc: '推荐',
      avatar: githubLogo,
    },
    {
      title: 'Gitee',
      desc: '推荐',
      avatar: giteeLogo,
    },
    {
      title: '七牛云',
      desc: '推荐',
      avatar: qiniuLogo,
    },
  ];

  return (
    <div className="platform">
      <ul>
        {data.map((item: any) => {
          return (
            <li key={item.title}>
              <Avatar
                className="platformAvatar"
                size={40}
                src={item.avatar || ''}
              />
              <div className="describe">
                <span className="title">{item.title}</span>
                <Text type="secondary" className="desc">
                  {item.desc || ''}
                </Text>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Platform;
