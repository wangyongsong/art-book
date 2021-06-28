import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Form,
  Select,
  Switch,
  Upload,
  Row,
  Progress,
  message,
} from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import db from '../../../../db';
import CONSTDATA from '../../../../config/constData';
import { getImages } from '../../../../auction/homeAction';
import githubUpload from '../../../../core/githubUpload';
import TagSelect from '../../../../components/Select/tagSelect';

import './resourceSeeting.global.scss';

const ResourceSeeting = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const history = useHistory();
  const [uploadSetting] = useState(db.get('uploadSetting'));
  const [fileList] = useState([]);
  const [hasAccountDisabled, sethasAccountDisabled] = useState<boolean>(true);

  const hasAcount = (useAccount: string, prompt = false) => {
    const noAc = !db.get(`accountSetting.${useAccount}`);
    const msgKey = 'msgSeting';
    sethasAccountDisabled(noAc);
    if (prompt && noAc)
      message.warning({
        content: (
          <span>
            您还未绑定该平台的账号，请前往“设置”绑定账号！
            <Button
              type="link"
              onClick={() => {
                message.destroy(msgKey);
                history.push({
                  pathname: '/setting',
                  state: { menu: '账号绑定' },
                });
              }}
              style={{ padding: 0, border: 0 }}
            >
              点击跳转
            </Button>
          </span>
        ),
        duration: 10,
        key: msgKey,
      });
    return noAc;
  };

  const getImagesCallback = useCallback(() => getImages(dispatch), [dispatch]);

  useEffect(() => {
    const dis = hasAcount(form.getFieldValue('useAccount'));
    sethasAccountDisabled(dis);
  }, []);

  return (
    <div className="resourceSeetingForm">
      <Form
        form={form}
        name="resourceSeetingForm"
        initialValues={{
          useAccount: uploadSetting?.useAccount,
          openWatermark: uploadSetting?.openWatermark || false,
          tagId: uploadSetting?.tagId || 5,
        }}
        onValuesChange={(_, v: any) => {
          const { useAccount } = v;
          const data = cloneDeep(v);
          if (hasAcount(useAccount)) delete data.useAccount;
          db.set('uploadSetting', data);
        }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="useAccount" label="账号">
          <Select
            options={CONSTDATA.useAccountOptions}
            onChange={(value: string) => hasAcount(value, true)}
          />
        </Form.Item>
        <Form.Item name="tagId" label="标签">
          <TagSelect />
        </Form.Item>
        <Form.Item name="openWatermark" label="水印" valuePropName="checked">
          <Switch checkedChildren="开启" unCheckedChildren="关闭" />
        </Form.Item>
        <Form.Item label="进度">
          <Progress percent={99} status="active" />
        </Form.Item>
        <div style={{ width: 100, height: 50 }} />

        <Row justify="center">
          <Form.Item>
            <Upload
              name="file"
              action=""
              fileList={fileList}
              onChange={(values) => {
                const { file } = values;
                githubUpload.getUploadFile(file, form.getFieldsValue());
                githubUpload.gitubReload(getImagesCallback);
              }}
            >
              <Button
                type="primary"
                shape="round"
                disabled={hasAccountDisabled}
                icon={<CloudUploadOutlined />}
              >
                点击上传图片
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              disabled={hasAccountDisabled}
              onClick={() => {
                // githubUpload.reload(add);
              }}
              icon={<CloudUploadOutlined />}
            >
              上传剪切图片
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              disabled={hasAccountDisabled}
              icon={<CloudUploadOutlined />}
            >
              上传在线图片
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default ResourceSeeting;
