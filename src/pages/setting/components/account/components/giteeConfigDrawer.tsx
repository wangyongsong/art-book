import React, { useState, useImperativeHandle, useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, message } from 'antd';

import { storagePathReg } from '../../../../../utils/regUtils';
import db from '../../../../../db';

type CType = {
  oRef: any;
  reloadList: any;
};

const ACCOUNTSETTING_GITEE = 'accountSetting.gitee';
const GITEE = 'Gitee';

const GiteeConfigDrawer = (props: CType) => {
  const { oRef, reloadList } = props;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const close = () => setVisible(false);

  const open = () => setVisible(true);

  useImperativeHandle(oRef, () => ({
    close,
    open,
  }));

  const onFinish = (values: any) => {
    db.set(ACCOUNTSETTING_GITEE, values);
    close();
    message.success(`${GITEE}配置成功`);
    reloadList();
  };

  useEffect(() => {
    if (visible) {
      const giteeData = db.get(ACCOUNTSETTING_GITEE);
      if (giteeData) {
        form.setFieldsValue({ ...giteeData });
      }
    }
  }, [visible]);

  return (
    <Drawer
      width={435}
      title={`${GITEE} - 账户配置`}
      placement="right"
      onClose={close}
      visible={visible}
      destroyOnClose
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" size="small" onClick={() => form.submit()}>
            保存配置
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          branch: 'main',
          repository: 'ArtBookFigureBed',
        }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="repository"
              label="仓库名称"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入仓库名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="accessToken"
              label="访问令牌 ( access token ) "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder="请输入访问令牌" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="storagePath"
              label="指定存储路径"
              tooltip="例如: images/"
              rules={[
                {
                  validator: storagePathReg,
                },
              ]}
            >
              <Input placeholder="例如: images/" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="domainName" label="自定义域名">
              <Input placeholder="例如: https://xxxx.com" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default GiteeConfigDrawer;
