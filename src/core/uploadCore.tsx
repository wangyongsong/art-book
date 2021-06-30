import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { getImages } from '../auction/homeAction';
import githubUpload from './github/githubUpload';
import giteeUpload from './gitee/giteeUpload';

const useUploadCore = () => {
  const dispatch = useDispatch();
  const getImagesCallback = useCallback(() => getImages(dispatch), [dispatch]);

  const commonUploadImage = (
    file: RcFile | undefined,
    form: { useAccount: any; tagId: string }
  ) => {
    const { useAccount } = form;
    if (!file) {
      message.error('获取文件失败！');
      return;
    }
    message.info('正在上传文件，请等候...');
    switch (useAccount) {
      case 'github':
        githubUpload.putGithubFile(file, form);
        githubUpload.reload(getImagesCallback);
        break;
      case 'gitee':
        giteeUpload.postGiteeFile(file, form);
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
