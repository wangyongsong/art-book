import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import Base from './components/base';
import Account from './components/account';
import Notice from './components/notice';
import './setting.global.scss';

const { Sider, Content } = Layout;

const Setting = (props: any) => {
  const {
    location: { state },
  } = props;
  const [current, setCurrent] = useState('基础设置');

  useEffect(() => {
    if (state) setCurrent(state.menu);
  }, []);

  const menu = [
    {
      title: '基础设置',
      components: <Base key="1" />,
    },
    {
      title: '账号绑定',
      components: <Account key="2" />,
    },
    {
      title: '新消息通知',
      components: <Notice key="3" />,
    },
  ];

  return (
    <Layout className="settingLayout">
      <Sider className="settingSide">
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="vertical"
          className="settingMenu"
        >
          {menu.map((item) => (
            <Menu.Item key={item.title}>{item.title}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content className="settingContent">
        <div className="settingContentTitle">{current}</div>
        {menu.map((item) => {
          if (item.title === current) {
            return item.components;
          }
          return null;
        })}
      </Content>
    </Layout>
  );
};

export default Setting;
