import React from 'react';
import { Avatar, Space } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import './index.global.scss';

export default function Header() {
  // const handleMenuClick = (e: any) => {
  //   console.log('click', e);
  // };

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="1">1st item</Menu.Item>
  //     <Menu.Item key="2">2nd item</Menu.Item>
  //     <Menu.Item key="3">3rd item</Menu.Item>
  //   </Menu>
  // );

  return (
    <div className="header">
      <Space>
        <BellOutlined />
        <Avatar
          alt="avatar"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          size="small"
        />
      </Space>
    </div>
  );
}
