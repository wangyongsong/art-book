import { LowSync, JSONFileSync } from 'lowdb';
import fs from 'fs-extra';
import { remote, app } from 'electron';
import { join } from 'path';
import { chain } from 'lodash';
// import { chain } from 'lodash';

const APP = process.type === 'renderer' ? remote.app : app;
const USERDATA_PATCH = APP.getPath('userData');
const dataFile = join(USERDATA_PATCH, './data.json');
// console.log(`dataFile`, dataFile);

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(USERDATA_PATCH)) {
    fs.mkdirpSync(USERDATA_PATCH);
  }
}

type DataType = {
  images: any[];
  baseInfo: any;
};

class DB {
  // private db: any;
  /** main database, use this to access the db */
  db: LowSync<DataType>;

  public chain: any;

  constructor() {
    this.db = new LowSync(new JSONFileSync<DataType>(dataFile));
    this.chain = chain(this.db.data);
    this.initialize();
    console.log(`this.db`, this.db);
  }

  private initialize() {
    if (!this.db.data) {
      Object.assign(this.db, { data: {} });
    }

    if (!this.db.data?.images) {
      Object.assign(this.db.data, { images: [] });
      this.db.write();
    }

    if (!this.db.data?.baseInfo) {
      Object.assign(this.db.data, { baseInfo: {} });
      this.db.write();
    }
  }

  read() {
    return this.db.data;
  }

  // get(key = '') {
  //   return this.db.chain.find(key);
  // }

  // set(key: string, value: any) {
  //   return this.read().set(key, value).write();
  // }

  // has(key: string) {
  //   return this.read().has(key).value();
  // }

  // insert(key: string, value: any): void {
  //   return this.read().get(key).insert(value).write();
  // }

  // unset(key: string, value: any): boolean {
  //   return this.read().get(key).unset(value).value();
  // }

  // getById(key: string, id: string) {
  //   return this.read().get(key).getById(id).value();
  // }

  // removeById(key: string, id: string) {
  //   return this.read().get(key).removeById(id).write();
  // }
}

export default new DB();
