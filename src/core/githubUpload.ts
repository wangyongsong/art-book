import { UploadFile } from 'antd/lib/upload/interface';
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
    this.githubAxios = axios.create({
      baseURL,
      headers: {
        Authorization: `token ${this.githubConf.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getUploadFile(value: UploadFile<any>, formData: any) {
    this.file = value.originFileObj;
    this.formData = formData;
    if (!this.file) return;
    this.putGithubFile();
  }

  putGithubFile() {
    this.getGithubConf();
    const {
      githubConf: { userName, repository, storagePath = '' },
      file,
      formData: { tagId, useAccount },
    } = this;
    const uploadTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;
    this.githubAxios
      .put(
        `/repos/${userName}/${repository}/contents/${storagePath}${fileName}`,
        {
          message: `上传时间: ${uploadTime} & 上传方式: ArtBook`,
          content: Buffer.from(fs.readFileSync(this.file.path)).toString(
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
        }
        return null;
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }

  gitubReload(fn: any) {
    this.imageReload = fn;
  }
}

export default new GithubUpload();
