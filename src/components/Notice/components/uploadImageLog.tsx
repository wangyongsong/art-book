import React from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const UploadImageLog = () => {
  const dataSource = [
    {
      title: '上传成功',
      description: '111',
      success: true,
    },
    {
      title: '上传失败',
      description: '111',
      success: false,
    },
    {
      title: '上传成功',
      description: '111',
      success: true,
    },
    {
      title: '上传失败',
      description: '111',
      success: false,
    },
    {
      title: '上传成功',
      description: '111',
      success: true,
    },
    {
      title: '上传失败',
      description: '111',
      success: false,
    },
    {
      title: '上传成功',
      description: '111',
      success: true,
    },
    {
      title: '上传失败',
      description: '111',
      success: false,
    },
  ];

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        size="small"
        itemLayout="horizontal"
        loadMore={<div>1111</div>}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  item.success ? (
                    <CheckCircleOutlined className="typeColor typeColorSuccess" />
                  ) : (
                    <CloseCircleOutlined className="typeColor typeColorError" />
                  )
                }
                title={item.title}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UploadImageLog;
