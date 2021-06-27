import { UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosInstance } from 'axios';
import fs from 'fs-extra';
import db from '../db';

type GithubConfType = {
  repository: string;
  userName: string;
  accessToken: string;
  storagePath?: string;
};

class GithubUpload {
  file: any;

  githubAxios!: AxiosInstance;

  githubConf!: GithubConfType;

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

  getUploadFile(value?: UploadFile<any>) {
    this.file = value?.originFileObj;
    if (!this.file) return;
    this.putGithubFile();
  }

  putGithubFile() {
    this.getGithubConf();
    const { githubConf, file } = this;

    this.githubAxios
      .put(
        `/repos/${githubConf.userName}/${githubConf.repository}/contents/${githubConf.storagePath}${file.name}`,
        {
          message: `time: ${new Date()}&from: ArtBook`,
          content: Buffer.from(fs.readFileSync(this.file.path)).toString(
            'base64'
          ),
        }
      )
      .then((res) => {
        console.log(`res`, res);
        return null;
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }
}

export default new GithubUpload();
