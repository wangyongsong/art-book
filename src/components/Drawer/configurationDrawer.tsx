import React, { useState, useImperativeHandle } from 'react';
import { Button, Drawer } from 'antd';

type ConfigurationDrawerType = {
  oRef: any;
};

const ConfigurationDrawer = (props: ConfigurationDrawerType) => {
  const { oRef } = props;
  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const open = () => setVisible(true);

  useImperativeHandle(oRef, () => ({
    close,
    open,
  }));

  return (
    <Drawer
      title=""
      placement="right"
      closable={false}
      onClose={close}
      width={435}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" size="small">
            保存配置
          </Button>
        </div>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default ConfigurationDrawer;
