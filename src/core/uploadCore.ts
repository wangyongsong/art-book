/* eslint-disable class-methods-use-this */
import { clipboard } from 'electron';
import fs from 'fs-extra';
import sharp, { Sharp } from 'sharp';
import { message } from 'antd';
import axios from 'axios';
import { RcFile } from 'antd/lib/upload';
import db from '../db';
import githubUpload from './github/githubUpload';
import giteeUpload from './gitee/giteeUpload';
import { FileToBase64Type } from '../utils/commonUtils';

type FormData = { useAccount: string; tagId: number };

class UploadCore {
  reloadImageList: any;

  constructor(reload: any) {
    this.reloadImageList = reload;
  }

  commonUploadImage(base64File: FileToBase64Type, form: FormData) {
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

  async autoAppointUploadImage(
    type: 'common' | 'clipboard' | 'url',
    file: any,
    form: FormData
  ) {
    const {
      watermark: openWatermark,
      compression: openCompression,
    }: any = form;
    const { forceDB } = db.get('uploadSetting.compression') || {};
    const { watermark, compression } = db.get('useUploadForm');

    let data: any = null;
    switch (type) {
      case 'common':
        if (watermark && compression) {
          data = { bufferFile: file.path, name: file.name };
        } else {
          data = this.fileToBase64(file);
          this.commonUploadImage(data, form);
          return null;
        }
        break;
      case 'clipboard':
        data = this.clipboardUploadImage();
        break;
      case 'url': {
        await this.imgUrlToBase64(file.bufferFile).then((v) => {
          if (v) data = { bufferFile: v, name: file.name };
          return null;
        });
        break;
      }
      default:
        break;
    }

    if (!data) {
      return null;
    }

    let sharpData = this.sharpImage(data?.bufferFile);

    if (openWatermark) sharpData = this.sharpWaterMark(sharpData);

    if (openCompression) sharpData = this.sharpCompression(sharpData);

    await sharpData
      .toBuffer()
      .then((outputBuffer) => {
        const name =
          forceDB === 'notRevise'
            ? data.name
            : `${data.name}_change.${forceDB || 'png'}`;
        this.commonUploadImage(
          {
            base64: outputBuffer.toString('base64'),
            name,
          },
          form
        );
        return null;
      })
      .catch((err) => {
        console.error(`err`, err);
        message.error('（ 图片 + 水印 ）合成失败');
      });

    return null;
  }

  sharpImage(input: Buffer | string) {
    return sharp(input, { animated: true }).sharpen().withMetadata();
  }

  sharpWaterMark(sharpFile: Sharp) {
    const svg = db.get('waterMarkSVG');
    const { top, left } = db.get('uploadSetting.watermark');
    const watermarkArr = [];
    watermarkArr.push({
      input: Buffer.from(svg),
      gravity: 'southeast',
      top,
      left,
    });
    return sharpFile.composite(watermarkArr);
  }

  sharpCompression(sharpFile: Sharp) {
    const { qualityDB = 90, forceDB } =
      db.get('uploadSetting.compression') || {};

    const quality = qualityDB || undefined;
    const compressionLevel = quality ? quality / 10 : undefined;

    return sharpFile
      .jpeg({
        quality,
        optimiseScans: true,
        chromaSubsampling: '4:4:4',
        force: forceDB === 'jepg',
      })
      .png({
        progressive: true,
        compressionLevel,
        force: forceDB === 'png',
      })
      .webp({
        quality,
        lossless: true,
        force: forceDB === 'webp',
      });
  }

  clipboardUploadImage() {
    try {
      const image: any = clipboard.readImage();

      if (image.isEmpty()) {
        message.warning('未获取到剪切板内容');
        return null;
      }
      message.info('正在处理图片，请等候...');

      const bufferFile = Buffer.from(image.toPNG(), 'binary');

      return {
        name: `${new Date().getTime()}-剪切板图片.png`,
        bufferFile,
      };
    } catch (error) {
      message.error(`剪贴板数据无法转换成图片! ${error}`);
      return null;
    }
  }

  async imgUrlToBase64(url: string) {
    return axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        if (res.status === 200) {
          return Buffer.from(res.data);
        }
        message.error('图片下载失败');

        return null;
      })
      .catch((err) => {
        message.error('图片下载失败');
        console.error(`err`, err);
      });
  }

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
