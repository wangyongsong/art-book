import React, { useState, useEffect, useRef } from 'react';
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
import { useHistory } from 'react-router-dom';
import { UploadChangeParam } from 'antd/lib/upload';
import { cloneDeep } from 'lodash';
import db from '../../../../db';
import CONSTDATA from '../../../../config/constData';
import UploadCore from '../../../../core/uploadCore';
import TagSelect from '../../../../components/Select/tagSelect';
import useGetDB from '../../../../hooks/useGetDB';
import useGetDispatch from '../../../../hooks/useGetDispatch';
import UrlUploadModal from './components/urlUploadModal';

import './resourceSeeting.global.scss';

const ResourceSeeting = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const {
    dbData: useUploadFormDB,
    setNewDBData: setNewDBDataUploadFormDB,
  } = useGetDB('useUploadForm');
  const [fileList] = useState([]);
  const { getImagesList } = useGetDispatch();
  const uc = new UploadCore(getImagesList);
  const urlUploadModal: any = useRef();
  const [hasAccountDisabled, sethasAccountDisabled] = useState<boolean>(true);

  const hasAcount = (useAccount: string, prompt = false) => {
    const noAc = !db.get(`accountSetting.${useAccount}`);
    const msgKey = 'msgSetting';
    sethasAccountDisabled(noAc);
    if (prompt && noAc)
      message.warning({
        content: (
          <span>
            您还未绑定该平台的账号，请前往“设置-账号绑定”配置选项！
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

  const hasUploadSetting = (name: string) => {
    const noAc = !db.get(`uploadSetting.${name}`);
    const msgKey = 'msgUploadSetting';
    if (noAc) {
      form.setFieldsValue({ [name]: false });
      db.set(`useUploadForm.${name}`, false);
      message.warning({
        content: (
          <span>
            您还未配置相关内容，请前往“设置-上传设置”配置选项！
            <Button
              type="link"
              onClick={() => {
                message.destroy(msgKey);
                history.push({
                  pathname: '/setting',
                  state: { menu: '上传设置' },
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
    }

    return noAc;
  };

  useEffect(() => {
    form.setFieldsValue({ ...useUploadFormDB });
    const dis = hasAcount(form.getFieldValue('useAccount'));
    sethasAccountDisabled(dis);
  }, []);

  return (
    <div className="resourceSeetingForm">
      <Form
        form={form}
        name="resourceSeetingForm"
        initialValues={{
          tagId: 5,
          watermark: false,
          compression: true,
        }}
        onValuesChange={(_, v: any) => {
          const { useAccount } = v;
          const data = cloneDeep(v);
          if (hasAcount(useAccount)) delete data.useAccount;
          setNewDBDataUploadFormDB(data);
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
        <Form.Item name="watermark" label="水印" valuePropName="checked">
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(value) => {
              if (value) hasUploadSetting('watermark');
            }}
          />
        </Form.Item>
        <Form.Item name="compression" label="压缩" valuePropName="checked">
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(value) => {
              if (value) hasUploadSetting('compression');
            }}
          />
        </Form.Item>
        <Form.Item label="进度">
          <Progress percent={99} status="active" />
        </Form.Item>
        <div style={{ width: 100, height: 20 }} />

        <Row justify="center">
          <Form.Item>
            <Upload
              name="file"
              action=""
              multiple
              fileList={fileList}
              onChange={({ file: { originFileObj } }: UploadChangeParam) => {
                if (!originFileObj) {
                  message.error('获取源文件失败！');
                  return;
                }
                message.info('正在处理图片，请等候...');
                const formData = form.getFieldsValue();
                uc.autoAppointUploadImage('common', originFileObj, formData);
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
                const formData = form.getFieldsValue();
                message.info('正在处理图片，请等候...');
                uc.autoAppointUploadImage('clipboard', null, formData);
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
              onClick={() => urlUploadModal.current.open()}
            >
              上传在线图片
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <UrlUploadModal
        oRef={urlUploadModal}
        formData={form.getFieldsValue()}
        uc={uc}
      />
    </div>
  );
};

export default ResourceSeeting;
