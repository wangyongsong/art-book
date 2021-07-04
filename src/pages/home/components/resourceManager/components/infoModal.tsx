import React, { useState, useImperativeHandle } from 'react';
import { Descriptions, Modal } from 'antd';

type Props = {
  oRef: any;
  selectItem: any;
};

const InfoModal = (props: Props) => {
  const { oRef, selectItem } = props;
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  useImperativeHandle(oRef, () => ({
    open,
    close,
  }));

  return (
    <Modal
      title="查看详情"
      visible={visible}
      footer={null}
      onCancel={close}
      style={{ top: 0 }}
    >
      <Descriptions bordered column={1} labelStyle={{ width: 120 }}>
        <Descriptions.Item label="上传账号">
          {selectItem.useAccount}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {selectItem.createdTime}
        </Descriptions.Item>
        <Descriptions.Item label="上传ID">{selectItem.id}</Descriptions.Item>
        <Descriptions.Item label="存储名称">
          {selectItem.path}
        </Descriptions.Item>
        <Descriptions.Item label="地址链接">{selectItem.src}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default InfoModal;
