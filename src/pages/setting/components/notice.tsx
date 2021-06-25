import { List, Switch } from 'antd';
import React from 'react';

const Notice = () => {
  const noticeList = [
    {
      title: '系统提示',
      description: '系统消息推送提示',
      action: [
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          key="1"
          onChange={(checked) => console.log(`checked`, checked)}
        />,
      ],
    },
  ];

  return (
    <>
      <List
        // loading={initLoading}
        itemLayout="horizontal"
        dataSource={noticeList}
        renderItem={(item) => (
          <List.Item actions={item.action}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default Notice;
