import React, { useState } from 'react';
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
import db from '../../../../db';
import CONSTDATA from '../../../../config/constData';
import './resourceSeeting.global.scss';

const ResourceSeeting = () => {
  const [form] = Form.useForm();
  const [setting] = useState(db.get('setting'));
  const [fileList, setFileList] = useState([]);

  const onFinish = (values: any) => {
    console.log(`values`, values);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const { Option } = Select;

  return (
    <div className="resourceSeetingForm">
      <Form
        form={form}
        name="resourceSeetingForm"
        onFinish={onFinish}
        initialValues={{
          platform: setting.platform || undefined,
          openWatermark: setting.openWatermark || false,
          tagId: setting.tagId || 5,
        }}
        onValuesChange={(_, v: any) => db.set('setting', v)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="platform" label="平台">
          <Select options={[{ label: 'SM.MS', value: 1 }]} />
        </Form.Item>
        <Form.Item name="tagId" label="标签">
          <Select>
            {CONSTDATA.tagOptions.map((item: any) => {
              return (
                <Option value={item.value} label={item.label} key={item.value}>
                  <div className="colorOptionLabelItem">
                    <span
                      role="img"
                      aria-label={item.label}
                      className="roundItem"
                      style={{ color: item.color }}
                    >
                      ●{' '}
                    </span>
                    {item.label}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="openWatermark" label="水印" valuePropName="checked">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="进度">
          <Progress percent={99} status="active" />
        </Form.Item>
        {/* <Form.Item label="队列">
          <Popover content={content} title="Title" placement="left">
            <Button type="primary" size="small" ghost>
              查看队列图片
            </Button>
          </Popover>
        </Form.Item> */}
        <div style={{ width: 100, height: 50 }} />

        <Row justify="center">
          <Form.Item>
            <Upload
              name="file"
              action=""
              fileList={fileList}
              onChange={(values) => {
                console.log(`values`, values.file);
                // console.log(`form`, form.getFieldsValue());
              }}
            >
              <Button
                type="primary"
                shape="round"
                icon={<CloudUploadOutlined />}
              >
                点击上传图片
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>
              上传剪切图片
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" shape="round" icon={<CloudUploadOutlined />}>
              上传在线图片
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default ResourceSeeting;
