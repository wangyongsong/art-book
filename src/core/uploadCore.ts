/* eslint-disable class-methods-use-this */
import { clipboard } from 'electron';
import fs from 'fs-extra';
import { message } from 'antd';
import axios from 'axios';
import { RcFile } from 'antd/lib/upload';
import db from '../db';
import githubUpload from './github/githubUpload';
import giteeUpload from './gitee/giteeUpload';
import { FileToBase64Type, watermark } from '../utils/commonUtils';
import tinifyCompression from './compression/tinifyAPI';

export type FormData = {
  useAccount: string;
  tagId: number;
  compression: boolean;
  watermark: boolean;
};

class UploadCore {
  reloadImageList: any;

  constructor(reload: any) {
    this.reloadImageList = reload;
  }

  upload(base64File: FileToBase64Type, form: FormData) {
    const { useAccount } = form;
    switch (useAccount) {
      case 'github':
        githubUpload.putGithubFile(base64File, form);
        githubUpload.reload(this.reloadImageList);
        break;
      case 'gitee':
        giteeUpload.postGiteeFile(base64File, form);
        giteeUpload.reload(this.reloadImageList);
        break;
      default:
        message.error('获取平台失败！');
        break;
    }
  }

  summary(type: string, file: any, form: FormData) {
    const { watermark: openWatermark, compression: openCompression } = form;
    if (!openWatermark && !openCompression) {
      this.noWaterMarkAndNoCompression(type, file, form);
    } else {
      let path = '';
      let name = '';
      switch (type) {
        case 'common':
          path = file.path;
          name = file.name;
          break;
        case 'clipboard': {
          const data = this.clipboardUploadImage('dataURL');
          path = data?.file || '';
          name = data?.name || '';
          break;
        }
        case 'url':
          path = file.url;
          name = file.name;
          break;
        default:
          break;
      }
      this.imageToCanvas(path, name, form);
    }
  }

  async noWaterMarkAndNoCompression(type: string, file: any, form: FormData) {
    let data: any = null;
    switch (type) {
      case 'common':
        data = this.fileToBase64(file);
        break;
      case 'clipboard':
        data = this.clipboardUploadImage('base64');
        break;
      case 'url':
        data = await this.imgUrlToBase64(file.url, file.name);
        break;
      default:
        break;
    }
    if (!data) return;
    message.info('正在处理图片，请等候...');
    this.upload(data, form);
  }

  async imageToCanvas(src: string, name: string, form: FormData) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const { height, width } = img;

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0);

      if (form.watermark) {
        const watermarkDB = db.get('uploadSetting.watermark') || {};
        let waterWith = watermarkDB.left;
        let waterHeight = watermarkDB.top;
        if (ctx) ctx.font = `${watermarkDB.fontSize}px SimSun, Songti SC`;
        if (ctx) ctx.fillStyle = watermarkDB.color;
        if (watermarkDB.waterMarkLocation === 'lowRight') {
          waterWith = width - watermarkDB.fontSize * watermarkDB.text.length;
          waterHeight = height - 10;
        }
        ctx?.fillText(watermarkDB.text, waterWith, waterHeight);
      }

      if (form.compression) {
        canvas.toBlob(
          async (blob) => {
            await tinifyCompression(name, blob)
              .then(async (res) => {
                if (res.status === 201) {
                  console.log(`res.data`, res.data);
                  const outPut: any = await this.imgUrlToBase64(
                    res.data.output.url,
                    name
                  );
                  this.upload(outPut, form);
                }
                return null;
              })
              .catch((err) => {
                console.log(`err`, err);
              });
          },
          'image/png',
          1
        );
      } else {
        const data = canvas.toDataURL('image/png', 1);
        const base64 = data.replace(/^data:image\/\w+;base64,/, '');

        this.upload(
          {
            base64,
            name,
          },
          form
        );
      }
    };
  }

  // clipboard
  clipboardUploadImage(type: 'base64' | 'dataURL') {
    try {
      const image: any = clipboard.readImage();

      if (image.isEmpty()) {
        message.warning('未获取到剪切板内容');
        return null;
      }
      const name = `剪切板图片.png`;
      let file = '';
      switch (type) {
        case 'base64':
          file = Buffer.from(image.toPNG(), 'binary').toString('base64');
          break;
        case 'dataURL':
          file = image.toDataURL();
          break;
        default:
          break;
      }
      return { file, name };
    } catch (error) {
      message.error(`剪贴板数据无法转换成图片! ${error}`);
    }
    return null;
  }

  // url to base64
  async imgUrlToBase64(url: string, name: string) {
    let data: { base64: string; name: string } | null = null;
    await axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        if (res.status === 200) {
          const base64 = Buffer.from(res.data).toString('base64');
          data = { base64, name };
          return data;
        }
        message.error('图片下载失败');
        return data;
      })
      .catch((err) => {
        message.error(`网络连接失败 ${err}`);
      });
    return data;
  }

  // file to base64
  fileToBase64(file: RcFile) {
    if (!file) return null;
    try {
      return {
        base64: Buffer.from(fs.readFileSync(file.path)).toString('base64'),
        name: file.name,
      };
    } catch (error) {
      message.error(error);
      return null;
    }
  }
}

export default UploadCore;
