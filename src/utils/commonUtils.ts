/* eslint-disable func-names */
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { clipboard } from 'electron';
import fs from 'fs-extra';
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
 * @description: 一键复制
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
 * @description: url转换 + 复制
 */
export function urlTransform(
  url: any[],
  type: 'url' | 'markdown' | 'html',
  copyable = true
) {
  let str = '';
  switch (type) {
    case 'url':
      str = url.map((item) => item.src).join(' ');
      break;
    case 'markdown':
      str = url.map((item) => `![${item.path}](${item.src})`).join(' ');
      break;
    case 'html':
      str = url
        .map((item) => `<img src="${item.src}" alt="${item.path}"/>`)
        .join(' ');
      break;
    default:
      break;
  }
  // if (copyable) copy(str);
  if (copyable) clipboard.write({ text: str });

  return str;
}

/**
 * @description: api接口 message
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

/**
 * @description: Image的URL转base64
 */
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

/**
 * @description: 唯一的message消息提示
 */
export function singleMessage(
  type: 'success' | 'warning' | 'info' | 'error',
  singleKey: string,
  content: any,
  duration = 3
) {
  message[type]({
    key: singleKey,
    content,
    duration,
  });
}

/**
 * @description: 剪切板内容
 */
export function getClipboardContents(): FileToBase64Type {
  const returnData = { base64: '', name: '' };
  try {
    const image: any = clipboard.readImage();
    console.log(`image`, image);

    if (image.isEmpty()) {
      message.warning('未获取到剪切板内容');
      return returnData;
    }

    const base64 = Buffer.from(image.toPNG(), 'binary').toString('base64');

    return {
      name: `${new Date().getTime()}-剪切板图片.png`,
      base64,
    };
  } catch (error) {
    message.error(`剪贴板数据无法转图片! ${error}`);
    return returnData;
  }
}

export type FileToBase64Type = {
  base64: string;
  name: string;
};

/**
 * @description: file转换base64
 */
export function fileToBase64(file: RcFile): FileToBase64Type {
  try {
    return {
      base64: Buffer.from(fs.readFileSync(file.path)).toString('base64'),
      name: file.name,
    };
  } catch (error) {
    message.error(error);
    return { base64: '', name: '' };
  }
}
