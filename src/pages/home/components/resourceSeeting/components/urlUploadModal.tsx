import React, { useState, useImperativeHandle } from 'react';
import { Modal, Form, Input, message } from 'antd';

type Props = {
  oRef: any;
  formData: any;
  uc: any;
};

const UrlUploadModal = (props: Props) => {
  const { oRef, formData, uc } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const open = () => setIsModalVisible(true);

  const close = () => setIsModalVisible(false);

  const handleOk = () => form.submit();

  useImperativeHandle(oRef, () => ({
    open,
    close,
  }));

  const onFinish = (values: any) => {
    const { url, name } = values;
    const suffix = url.split('.').pop();

    uc.summary(
      'url',
      {
        url,
        name: `${name}.${suffix}`,
      },
      formData
    );
    // close();
    // form.resetFields();
  };

  return (
    <Modal
      title="上传在线图片"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={close}
      destroyOnClose
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          label="图片链接"
          name="url"
          required
          rules={[
            {
              validator: async (_, value) => {
                const imageUrlReg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;
                const v = imageUrlReg.test(value);
                if (!v) throw new Error('请输入正确的图片链接');
              },
            },
          ]}
        >
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item label="图片名称" name="name" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UrlUploadModal;
