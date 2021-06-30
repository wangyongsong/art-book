import React, { useRef } from 'react';
import { List, Button, Avatar } from 'antd';
import GithubConfigDrawer from './components/githubConfigDrawer';
import GiteeConfigDrawer from './components/giteeConfigDrawer';

import smmsLogo from '../../../../assets/logo/smms-logo.png';
import githubLogo from '../../../../assets/logo/github-logo.png';
import giteeLogo from '../../../../assets/logo/gitee-logo.png';
import qiniuLogo from '../../../../assets/logo/qiniu-logo.png';
import useGetDB from '../../../../hooks/useGetDB';

const Base = () => {
  const githubConfigDrawerRef: any = useRef();
  const giteeConfigDrawerRef: any = useRef();
  const {
    dbData: accountSettingDB,
    getNewDBData: getNewAccountSettingDB,
  } = useGetDB('accountSetting');

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
          {accountSettingDB?.github ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: 'Gitee',
      avatar: giteeLogo,
      description: 'Gitee图床配置',
      action: [
        <Button
          type="link"
          key="1"
          onClick={() => giteeConfigDrawerRef.current.open()}
        >
          {accountSettingDB?.gitee ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: '七牛云',
      avatar: qiniuLogo,
      description: '七牛云图床配置',
      action: [
        <Button type="link" key="1" onClick={() => {}}>
          {accountSettingDB?.qiniuyun ? '已绑定' : '绑定'}
        </Button>,
      ],
    },
    {
      title: 'SM.MS',
      avatar: smmsLogo,
      description: 'SM.MS图床配置',
      action: [
        <Button type="link" key="1" onClick={() => {}}>
          {accountSettingDB?.smms ? '已绑定' : '绑定'}
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
        reloadList={getNewAccountSettingDB}
      />

      <GiteeConfigDrawer
        oRef={giteeConfigDrawerRef}
        reloadList={getNewAccountSettingDB}
      />
    </>
  );
};

export default Base;
