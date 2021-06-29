/* eslint-disable func-names */
import { message } from 'antd';
import https from 'https';
import { URL } from 'url';

/**
 *  @description: key value 转换 options
 *  @param: valueEnum
 */
export function valueEnumTransformOptions(
  valueEnum: any,
  valueType?: 'number' | 'string'
) {
  const options: any = [];
  Object.keys(valueEnum).map((i) => {
    options.push({
      value: valueType === 'number' ? Number(i) : `${i}`,
      label: valueEnum[i].text,
      disabled: valueEnum[i].disabled || false,
    });
    return null;
  });
  return options;
}

/**
 * 一键复制
 */
export function copy(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful === true) {
      message.success('复制成功！');
    } else {
      message.warning('该设备不支持点击复制到剪贴板');
    }
  } catch (err) {
    message.warning('该设备不支持点击复制到剪贴板');
  }
  document.body.removeChild(textArea);
}

/**
 * api接口 message
 */
export function apiMessage(
  uploadTime: string,
  type: 'upload' | 'delete' = 'upload'
) {
  const str = '';
  switch (type) {
    case 'upload':
      return `上传时间: ${uploadTime} & 上传方式: ArtBook`;
    case 'delete':
      return `删除时间: ${uploadTime} & 删除方式: ArtBook`;
    default:
      return str;
  }
}

export async function imgUrlToBase64(url: string | https.RequestOptions | URL) {
  let base64Img;
  return new Promise(function (resolve) {
    const req = https.get(url, function (res) {
      const chunks: any[] = [];
      let size = 0;
      res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length; // 累加缓冲数据的长度
      });
      res.on('end', function () {
        const data = Buffer.concat(chunks, size);
        base64Img = data.toString('base64');
        resolve({ success: true, base64Img });
      });
    });
    req.on('error', (e) => {
      resolve({ success: false, errmsg: e.message });
    });
    req.end();
  });
}
