import React, { useRef } from 'react';
import { List, Button } from 'antd';
import WaterMarkDrawer from './components/waterMarkDrawer';
import CompressionDrawer from './components/compressionDrawer';
import useGetDB from '../../../../hooks/useGetDB';

const Base = () => {
  const waterMarkDrawerRef: any = useRef();
  const compressionDrawerRef: any = useRef();
  const {
    dbData: uploadSettingData,
    getNewDBData: getNewUploadSetting,
  } = useGetDB('uploadSetting');

  const BaseList = [
    {
      title: '水印配置',
      description: '关于上传图片的水印配置',
      action: [
        <Button
          type="link"
          key="1"
          onClick={() => waterMarkDrawerRef.current.open()}
        >
          {uploadSettingData?.watermark ? '已配置' : '添加'}
        </Button>,
      ],
    },
    {
      title: '压缩配置',
      description: '关于上传图片的压缩配置',
      action: [
        <Button
          type="link"
          key="1"
          onClick={() => compressionDrawerRef.current.open()}
        >
          {uploadSettingData?.compression ? '已配置' : '添加'}
        </Button>,
      ],
    },
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={BaseList}
        renderItem={(item) => (
          <List.Item actions={item.action}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <WaterMarkDrawer
        oRef={waterMarkDrawerRef}
        reloadList={getNewUploadSetting}
      />
      <CompressionDrawer
        oRef={compressionDrawerRef}
        reloadList={getNewUploadSetting}
      />
    </>
  );
};

export default Base;
