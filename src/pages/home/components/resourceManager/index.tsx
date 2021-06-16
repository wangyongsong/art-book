/* eslint-disable react/display-name */
/* eslint-disable no-plusplus */
import React from 'react';
import { Button, Tag, Space, Image } from 'antd';
import ProList from '@ant-design/pro-list';
import {
  CopyOutlined,
  FormOutlined,
  DeleteOutlined,
  // RedoOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import './resourceManager.global.scss';

const dataSource = [
  {
    id: 0,
    src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    desc: '我是一条测试的描述',
  },
  {
    id: 1,
    src:
      'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
    desc: '我是一条测试的描述',
  },
];

for (let index = 2; index < 1000; index++) {
  dataSource.push({
    id: index,
    desc: '我是一条测试的描述',
    src:
      'https://imrorwxhijjqlo5q-static.micyjz.com/cloud/mkBpiKmlRliSlnlpqjllk/22.jpg',
  });
}
const ResourceManager = () => {
  return (
    <div className="resourceManagerContent">
      <div className="resourceBox">
        <ProList<any>
          toolBarRender={() => {
            return [
              <Button key="add" type="primary">
                新建
              </Button>,
            ];
          }}
          onRow={(record: any) => {
            return {
              onMouseEnter: () => {
                console.log(record);
              },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          rowKey="name"
          headerTitle="基础列表"
          tooltip="基础列表的配置"
          dataSource={dataSource}
          showActions="hover"
          showExtra="hover"
          metas={{
            title: {
              dataIndex: 'name',
            },
            avatar: {
              dataIndex: 'image',
            },
            description: {
              dataIndex: 'desc',
            },
            subTitle: {
              render: () => {
                return (
                  <Space size={0}>
                    <Tag color="blue">Ant Design</Tag>
                    <Tag color="#5BD8A6">TechUI</Tag>
                  </Space>
                );
              },
            },
            actions: {
              render: (text, row) => [
                <a
                  href={row.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key="link"
                >
                  链路
                </a>,
                <a
                  href={row.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key="warning"
                >
                  报警
                </a>,
                <a
                  href={row.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key="view"
                >
                  查看
                </a>,
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
