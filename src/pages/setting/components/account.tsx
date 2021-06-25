import React, { useEffect, useRef, useState } from 'react';
import { List, Button, Avatar } from 'antd';
import GithubConfigDrawer from '../../../components/Drawer/githubConfigDrawer';

import smmsLogo from '../../../assets/logo/smms-logo.png';
import githubLogo from '../../../assets/logo/github-logo.png';
import giteeLogo from '../../../assets/logo/gitee-logo.png';
import qiniuLogo from '../../../assets/logo/qiniu-logo.png';
import db from '../../../db';

const Base = () => {
  const githubConfigDrawerRef: any = useRef();
  const [accountSetting, setAccountSetting] = useState(
    db.get('accountSetting')
  );

  const BaseList = [
    {
      title: 'GitHub',
      avatar: githubLogo,
      description: 'GitHub图床配置',
      action: [
        <Button
          type="link"
          key="1"
          onClick={() => githubConfigDrawerRef.current.open()}
        >
          {accountSetting?.github ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: 'Gitee',
      avatar: giteeLogo,
      description: 'Gitee图床配置',
      action: [
        <Button type="link" key="1" onClick={() => {}}>
          {accountSetting?.gitee ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: '七牛云',
      avatar: qiniuLogo,
      description: '七牛云图床配置',
      action: [
        <Button type="link" key="1" onClick={() => {}}>
          {accountSetting?.qiniuyun ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: 'SM.MS',
      avatar: smmsLogo,
      description: 'SM.MS图床配置',
      action: [
        <Button type="link" key="1" onClick={() => {}}>
          {accountSetting?.smms ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
  ];

  return (
    <>
      <List
        // loading={initLoading}
        itemLayout="horizontal"
        dataSource={BaseList}
        renderItem={(item) => (
          <List.Item actions={item.action}>
            <List.Item.Meta
              avatar={
                <Avatar
                  className="platformAvatar"
                  size={45}
                  shape="square"
                  src={item.avatar || ''}
                />
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />

      {/* Drawer */}
      <GithubConfigDrawer
        oRef={githubConfigDrawerRef}
        reloadList={() => setAccountSetting({ ...db.get('accountSetting') })}
      />
    </>
  );
};

export default Base;
