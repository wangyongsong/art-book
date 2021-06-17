/* eslint-disable react/display-name */
/* eslint-disable no-plusplus */
import React from 'react';
import { Button, Tag, Space, Image, Progress } from 'antd';
import ProList from '@ant-design/pro-list';
import {
  CopyOutlined,
  FormOutlined,
  DeleteOutlined,
  // RedoOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import './resourceManager.global.scss';

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item: any) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [
    <Button key={item} type="link">
      邀请
    </Button>,
  ],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: <div>123</div>,
}));

const ResourceManager = () => {
  return (
    <div className="resourceManagerContent">
      <div className="resourceBox">
        <ProList<any>
          pagination={{
            defaultPageSize: 8,
            showSizeChanger: false,
          }}
          // style={{ height: 400 }}
          grid={{ gutter: 16, column: 2 }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
            actions: {},
          }}
          headerTitle="翻页"
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
