/* eslint-disable func-names */
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';
// import sharp from 'sharp';
import { clipboard } from 'electron';
import textToSVG from 'text-to-svg';
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
      str = url.map((item) => item.src).join('\n');
      break;
    case 'markdown':
      str = url.map((item) => `![${item.path}](${item.src})`).join('\n');
      break;
    case 'html':
      str = url
        .map((item) => `<img src="${item.src}" alt="${item.path}"/>`)
        .join('\n');
      break;
    default:
      break;
  }
  // if (copyable) copy(str);
  if (copyable) {
    try {
      clipboard.write({ text: str });
      message.success('复制成功！');
    } catch (error) {
      message.warning('该设备不支持自动复制，请点开图片详情手动复制');
    }
  }

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
        // base64Img = data.toString('base64');
        resolve({ success: true, data });
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

export type FileToBase64Type = {
  base64: string;
  name: string;
};

/**
 * @description: 剪切板内容
 */
export function getClipboardContents(): FileToBase64Type {
  const returnData = { base64: '', name: '' };
  try {
    const image: any = clipboard.readImage();

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

/**
 * @description: 图片水印
 */
export async function watermark(
  sharpImage: any,
  { watermarkRaw, bottom, right }: any
) {
  const watermarkImg = await watermarkRaw.toBuffer();
  return sharpImage.overlayWith(watermarkImg, { bottom, right });
}

/**
 * @description: 文字水印
 */
export async function pasteText({ text, fontSize, color }: any) {
  const textSVG = textToSVG.loadSync();

  const options: any = {
    x: 0, // 文本开头的水平位置（默认值：0）
    y: 0, // 文本的基线的垂直位置（默认值：0）
    fontSize,
    anchor: 'top',
    // letterSpacing: "",  // 设置字母的间距
    attributes: { fill: color },
  };

  return textSVG.getSVG(text, options);
}

/**
 * @description: file转换base64
 */
export function fileToBase64(file: RcFile): FileToBase64Type {
  const returnData = { base64: '', name: '' };
  try {
    if (!file) return returnData;

    return {
      base64: Buffer.from(fs.readFileSync(file.path)).toString('base64'),
      name: file.name,
    };
  } catch (error) {
    message.error(error);
    return returnData;
  }
}

// export function fileHandle(file: RcFile, formData: any) {
//   const { watermark: openWatermark, compression: openCompression } = formData;
//   const { qualityDB = 90, forceDB } = db.get('uploadSetting.compression') || {};

//   const quality = openCompression ? qualityDB : undefined;
//   const compressionLevel = quality ? quality / 10 : undefined;
//   const watermarkArr = [];

//   if (openWatermark) {
//     const svg = db.get('waterMarkSVG');
//     const { top, left } = db.get('uploadSetting.watermark');
//     watermarkArr.push({
//       input: Buffer.from(svg),
//       gravity: 'southeast',
//       top,
//       left,
//     });
//   }

//   return sharp(file.path, { animated: true })
//     .composite(watermarkArr)
//     .sharpen()
//     .jpeg({
//       quality,
//       optimiseScans: true,
//       chromaSubsampling: '4:4:4',
//       force: forceDB === 'jepg',
//     })
//     .png({
//       progressive: true,
//       compressionLevel,
//       force: forceDB === 'png',
//     })
//     .webp({ quality, lossless: true, force: forceDB === 'webp' })
//     .withMetadata()
//     .toBuffer()
//     .then((outputBuffer) => {
//       return {
//         base64: outputBuffer.toString('base64'),
//         name: file.name,
//       };
//     })
//     .catch((err) => {
//       console.error(`err`, err);
//       message.error('（ 图片 + 水印 ）合成失败');
//     });
//   // .toBuffer((err, buffer, info) => {
//   //   console.log(`info`, info);
//   //   console.log(`info.size`, formatFileSize(info.size));
//   // });
// }

/**
 * @description: 换算文件大小
 */
export function formatFileSize(fileSize: number) {
  if (fileSize < 1024) {
    return `${fileSize}B`;
  }
  if (fileSize < 1024 * 1024) {
    let temp: any = fileSize / 1024;
    temp = temp.toFixed(2);
    return `${temp}KB`;
  }
  if (fileSize < 1024 * 1024 * 1024) {
    let temp: any = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return `${temp}MB`;
  }
  let temp: any = fileSize / (1024 * 1024 * 1024);
  temp = temp.toFixed(2);
  return `${temp}GB`;
}
