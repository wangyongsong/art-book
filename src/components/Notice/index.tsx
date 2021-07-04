import React, { useState, useImperativeHandle } from 'react';
import { Drawer, Tabs } from 'antd';
import UploadImageLog from './components/uploadImageLog';
import PushNotification from './components/pushNotification';

import './index.global.scss';

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
      destroyOnClose
      className="notice"
    >
      <Tabs defaultActiveKey="1" centered style={{ height: '100%' }}>
        <TabPane tab="消息推送" key="1">
          <PushNotification visible={visible} />
        </TabPane>
        <TabPane tab="上传日志" key="2" style={{ height: '100%' }}>
          <UploadImageLog visible={visible} />
        </TabPane>
        {/* <TabPane tab="上传队列" key="2">
          Content of Tab Pane 3
        </TabPane> */}
      </Tabs>
    </Drawer>
  );
};

export default Notice;
