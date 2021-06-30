import React from 'react';
import { List, Button } from 'antd';
import { remote, shell } from 'electron';
import db from '../../../../db';

const Base = () => {
  const BaseList = [
    {
      title: '数据文件',
      description: '存储本地数据文件',
      action: [
        <Button
          type="link"
          key="1"
          onClick={() => {
            const dataFilePath = db.get('dataFilePath');
            remote.shell.openPath(dataFilePath);
            shell.beep();
          }}
        >
          打开文件
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
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default Base;
