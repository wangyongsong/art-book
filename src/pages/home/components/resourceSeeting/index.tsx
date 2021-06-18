import React from 'react';
import {
  Button,
  Form,
  Select,
  Switch,
  Upload,
  Row,
  Progress,
  Popover,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import './resourceSeeting.global.scss';

const ResourceSeeting = () => {
  const [form] = Form.useForm();

  const onFinish = () => {};

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className="resourceSeetingForm">
      <Form
        form={form}
        name="resourceSeetingForm"
        onFinish={onFinish}
        // size="small"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="platform" label="渠道">
          <Select options={[{ label: 'SM.MS', value: 1 }]} />
        </Form.Item>
        <Form.Item name="tag" label="标签">
          <Select options={[{ label: '常规', value: 1 }]} />
        </Form.Item>
        <Form.Item name="watermark" label="水印">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item name="uploadProgress" label="进度">
          <Progress percent={99} status="active" />
        </Form.Item>
        <Form.Item name="uploadProgress" label="队列">
          <Popover content={content} title="Title" placement="left">
            <Button type="primary" size="small" ghost>
              查看队列图片
            </Button>
          </Popover>
        </Form.Item>

        <Row justify="center">
          <Form.Item name="uploadCommonImage">
            <Upload name="file" action="" onChange={() => {}}>
              <Button
                type="primary"
                shape="round"
                icon={<CloudUploadOutlined />}
              >
                点击上传图片
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="uploadClipboardImage">
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>
              上传剪切图片
            </Button>
          </Form.Item>
          <Form.Item name="uploadUrlImage">
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>
              上传URL图片
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default ResourceSeeting;
