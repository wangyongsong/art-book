import React, { useState, useImperativeHandle, useEffect } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  message,
  Select,
  InputNumber,
} from 'antd';
import { cloneDeep } from 'lodash';
import db from '../../../../../db';
import ColorSelect from '../../../../../components/Select/colorSelect';
import CONSTDATA from '../../../../../config/constData';
import { pasteText } from '../../../../../utils/commonUtils';

type CType = {
  oRef: any;
  reloadList: any;
};

const UPLOADSETTING_WATERMARK = 'uploadSetting.watermark';

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
    // data.top = data.top === null ? undefined : data.top;
    // data.left = data.left === null ? undefined : data.left;

    db.set(UPLOADSETTING_WATERMARK, data);
    pasteText({
      text: values.text,
      fontSize: values.fontSize,
      color: values.color,
    })
      .then((value) => {
        db.set('waterMarkSVG', value);
        message.success(`水印配置成功`);
        return true;
      })
      .catch((err) => {
        console.error(`文字转svg图片失败`, err);
        message.error('文字转svg出错，配置失败');
      });

    close();
    reloadList();
  };

  useEffect(() => {
    if (visible) {
      const data = db.get(UPLOADSETTING_WATERMARK);
      if (data) {
        form.setFieldsValue({ ...data });
      }
    }
  }, [visible]);

  return (
    <Drawer
      width={435}
      title="水印配置"
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
          waterMarkType: 'text',
          fontSize: 30,
          color: CONSTDATA.colorOptions[4].value,
          waterMarkLocation: 'lowRight',
        }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="waterMarkType"
              label="水印方式"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: '自定义文字', value: 'text' },
                  // { label: '自定义图片', value: 'pic' },
                ]}
                placeholder="请选择水印方式"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="text"
              label="水印内容"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入水印内容" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fontSize"
              label="文字大小"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="请输入文字大小"
                min={9}
                max={50}
                // formatter={(value) => `${value}px`}
                // parser={(value: any) => value.replace('px', '')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="color"
              label="文字颜色"
              rules={[{ required: true }]}
            >
              <ColorSelect
                options={CONSTDATA.colorOptions}
                placeholder="请选择文字颜色"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="waterMarkLocation"
              label="水印位置"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: '右下角', value: 'lowRight' },
                  { label: '自定义', value: 'custom' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item shouldUpdate>
          {() => {
            const show = form.getFieldValue('waterMarkLocation') === 'custom';
            return (
              show && (
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="left"
                      label="距左边缘的像素偏移量"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        placeholder="请输入偏移量"
                        min={-10000}
                        max={10000}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="top"
                      label="距上边缘的像素偏移量"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        placeholder="请输入偏移量"
                        min={-10000}
                        max={10000}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )
            );
          }}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default WaterMarkDrawer;
