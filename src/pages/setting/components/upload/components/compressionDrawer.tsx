import React, { useState, useImperativeHandle, useEffect } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  message,
  Select,
  InputNumber,
} from 'antd';
import { cloneDeep } from 'lodash';
import db from '../../../../../db';

type CType = {
  oRef: any;
  reloadList: any;
};

const UPLOADSETTING_COMPRESSION = 'uploadSetting.compression';

const WaterMarkDrawer = (props: CType) => {
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
    const data = cloneDeep(values);

    db.set(UPLOADSETTING_COMPRESSION, data);
    message.success('图片压缩配置成功');
    close();
    reloadList();
  };

  useEffect(() => {
    if (visible) {
      const data = db.get(UPLOADSETTING_COMPRESSION);
      if (data) {
        form.setFieldsValue({ ...data });
      }
    }
  }, [visible]);

  return (
    <Drawer
      width={435}
      title="压缩配置"
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
          qualityDB: 80,
        }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="forceDB"
              label="输出格式"
              rules={[{ required: true }]}
              tooltip="如果指定非原图格式输出，上传时将会强制修改图片格式。"
            >
              <Select
                options={[
                  { label: '原图格式', value: 'notRevise' },
                  { label: '.JPEG', value: 'jpeg' },
                  { label: '.PNG', value: 'png' },
                  { label: '.WEBP', value: 'webp' },
                ]}
                placeholder="请选择输出格式"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="qualityDB"
              label="压缩质量"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="请输入压缩质量"
                min={10}
                max={90}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value.replace('%', '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default WaterMarkDrawer;
