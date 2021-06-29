import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosInstance } from 'axios';
import fs from 'fs-extra';
import moment from 'moment';
import db from '../db';

type GithubConfType = {
  repository: string;
  userName: string;
  accessToken: string;
  storagePath?: string;
};

class GithubUpload {
  file: any;

  formData: any;

  githubAxios!: AxiosInstance;

  githubConf!: GithubConfType;

  imageReload: any;

  constructor() {
    this.githubAxiosConf();
  }

  getGithubConf() {
    const data = db.get('accountSetting.github');
    this.githubConf = data;
  }

  githubAxiosConf() {
    this.getGithubConf();
    const baseURL = 'https://api.github.com';
    const request = axios.create({
      baseURL,
      headers: {
        Authorization: `token ${this.githubConf.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    this.githubAxios = request;
  }

  getUploadFile(value: UploadFile<any>, formData: any) {
    this.file = value.originFileObj;
    this.formData = formData;
    if (!value.originFileObj) return;
    this.putGithubFile(value.originFileObj);
  }

  putGithubFile(originFileObj: RcFile) {
    this.githubAxiosConf();
    const {
      githubConf: { userName, repository, storagePath = '' },
      formData: { tagId, useAccount },
    } = this;
    const uploadTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${originFileObj.name}`;
    this.githubAxios
      .put(
        `/repos/${userName}/${repository}/contents/${storagePath}${fileName}`,
        {
          message: `上传时间: ${uploadTime} & 上传方式: ArtBook`,
          content: Buffer.from(fs.readFileSync(originFileObj.path)).toString(
            'base64'
          ),
        }
      )
      .then((res: any) => {
        const { status, data } = res;
        if (status === 201) {
          db.insert('images', {
            tagId,
            useAccount,
            src: data.content.download_url,
            createdTime: uploadTime,
          });
          this.imageReload();
          this.insertUploadImagesLog(`${fileName} ${uploadTime}`, true);
        }
        return res;
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
            status,
            config,
          },
        } = err;
        const errorMsg = `(${status} ${message})(${config.url})`;
        this.insertUploadImagesLog(
          `${originFileObj.name} ${uploadTime} ${errorMsg}`,
          false
        );
      });
  }

  gitubReload(fn: any) {
    this.imageReload = fn;
  }

  insertUploadImagesLog(description: string, success: boolean) {
    const { file } = this;
    db.insert('uploadImagesLog', {
      success,
      description,
      read: false,
    });
  }
}

export default new GithubUpload();
