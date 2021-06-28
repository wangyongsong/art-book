import React, { useState, useImperativeHandle } from 'react';
import { Drawer, Tabs } from 'antd';
import UploadImageLog from './components/uploadImageLog';

interface PropsType {
  oRef: any;
}

const { TabPane } = Tabs;

const Notice = (props: PropsType) => {
  const { oRef } = props;
  const [visible, setvisible] = useState(false);

  const open = () => setvisible(true);
  const close = () => setvisible(false);

  useImperativeHandle(oRef, () => ({
    open,
    close,
  }));

  return (
    <Drawer
      visible={visible}
      placement="right"
      onClose={close}
      width={350}
      closable={false}
    >
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="消息推送" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="上传队列" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="上传日志" key="2">
          <UploadImageLog />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default Notice;
