import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getImages } from '../auction/homeAction';
import githubUpload from './github/githubUpload';
import giteeUpload from './gitee/giteeUpload';
// import { singleMessage } from '../utils/commonUtils';

// const DELETE_MESSAGE_1 = 'DELETE_MESSAGE_1';
// singleMessage('info', DELETE_MESSAGE_1, '正在请求删除数据，请等候...');

const useDeleteCore = () => {
  const dispatch = useDispatch();
  const getImagesCallback = useCallback(() => getImages(dispatch), [dispatch]);

  const deleteImage = (item: any) => {
    const { useAccount } = item;
    if (!item) {
      message.error('获取图片信息失败！');
      return;
    }

    message.info('正在请求删除数据，请等候...');
    switch (useAccount) {
      case 'github':
        githubUpload.deleteGithubFile(item);
        githubUpload.reload(getImagesCallback);
        break;
      case 'gitee':
        giteeUpload.deleteGiteeFile(item);
        giteeUpload.reload(getImagesCallback);
        break;
      default:
        message.error('获取删除文件信息失败！');
        break;
    }
  };

  const confirmDeleteImage = (item: any[]) => {
    Modal.confirm({
      title: '确定删除图片吗?',
      content: '如果点击确定，将会删除本地和远程仓库的图片。',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const len = item.length;
        if (len === 1) deleteImage(item[0]);
      },
    });
  };

  return { confirmDeleteImage, deleteImage };
};

export default useDeleteCore;
