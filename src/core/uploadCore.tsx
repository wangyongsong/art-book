import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { getImages } from '../auction/homeAction';
import githubUpload from './github/githubUpload';
import giteeUpload from './gitee/giteeUpload';
import { FileToBase64Type } from '../utils/commonUtils';

const useUploadCore = () => {
  const dispatch = useDispatch();
  const getImagesCallback = useCallback(() => getImages(dispatch), [dispatch]);

  const commonUploadImage = (
    base64File: FileToBase64Type,
    form: { useAccount: any; tagId: string }
  ) => {
    const { useAccount } = form;
    if (!base64File) {
      message.error('获取文件失败！');
      return;
    }
    message.info('正在上传文件，请等候...');
    switch (useAccount) {
      case 'github':
        githubUpload.putGithubFile(base64File, form);
        githubUpload.reload(getImagesCallback);
        break;
      case 'gitee':
        giteeUpload.postGiteeFile(base64File, form);
        giteeUpload.reload(getImagesCallback);
        break;
      default:
        message.error('获取平台失败！');
        break;
    }
  };

  return { commonUploadImage };
};

export default useUploadCore;
