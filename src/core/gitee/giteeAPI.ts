import moment from 'moment';
import db from '../../db';
import { apiMessage, FileToBase64Type } from '../../utils/commonUtils';
import request from './giteeAxios';

/**
 * @description: 创建文件
 */
export function giteePostFileAPI(params: {
  base64File: FileToBase64Type;
  uploadTime: string;
}) {
  const { base64File, uploadTime } = params;
  const { userName, repository, storagePath = '', accessToken } =
    db.get('accountSetting.gitee') || {};
  const timestamp = new Date().getTime();
  const fileName = `${moment(timestamp).valueOf()}-${base64File.name}`;
  return request({
    method: 'POST',
    url: `/repos/${userName}/${repository}/contents/${storagePath}${fileName}`,
    data: {
      access_token: accessToken,
      message: apiMessage(uploadTime),
      content: base64File.base64,
    },
  });
}

/**
 * @description: 更新文件
 */
export function giteePutFileAPI(params: {
  base64File: FileToBase64Type;
  uploadTime: string;
}) {
  const { base64File, uploadTime } = params;
  const { userName, repository, storagePath = '', accessToken } =
    db.get('accountSetting.gitee') || {};
  const timestamp = new Date().getTime();
  const fileName = `${moment(timestamp).valueOf()}-${base64File.name}`;

  return request({
    method: 'PUT',
    url: `/repos/${userName}/${repository}/contents/${storagePath}${fileName}`,
    data: {
      access_token: accessToken,
      message: apiMessage(uploadTime),
      content: base64File.base64,
    },
  });
}

/**
 * @description: 删除文件
 */
export async function giteeDeleteFile(params: {
  item: any;
  deleteTime: string;
}) {
  const {
    item: { path, sha },
    deleteTime,
  } = params;
  const { userName, repository, accessToken } =
    db.get('accountSetting.gitee') || {};
  return request({
    method: 'DELETE',
    url: `/repos/${userName}/${repository}/contents/${path}`,
    data: {
      sha,
      access_token: accessToken,
      message: apiMessage(deleteTime, 'delete'),
    },
  });
}
