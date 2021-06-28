/* eslint-disable @typescript-eslint/ban-ts-comment */
import Datastore from 'lowdb';
// @ts-ignore
import LodashId from 'lodash-id';
import FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs-extra';
import { remote, app } from 'electron';
import { join } from 'path';

const APP = process.type === 'renderer' ? remote.app : app;
const USERDATA_PATH = APP.getPath('userData');
const dataFile = join(USERDATA_PATH, './data.json');
// const imagesFile = join(USERDATA_PATH, './imageFile');

console.log(`dataFile`, dataFile);

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(USERDATA_PATH)) {
    fs.mkdirpSync(USERDATA_PATH);
  }
}

class DB {
  private db: Datastore.LowdbSync<Datastore.AdapterSync>;

  constructor() {
    const adapter = new FileSync(dataFile);
    this.db = Datastore(adapter);
    this.db._.mixin(LodashId);
    this.init();
  }

  init() {
    if (!this.db.has('images').value()) {
      this.db.set('images', []).write();
    }
    if (!this.db.has('errorImages').value()) {
      this.db.set('errorImages', []).write();
    }
    if (!this.db.has('successImages').value()) {
      this.db.set('successImages', []).write();
    }
    if (!this.db.has('notice').value()) {
      this.db.set('notice', []).write();
    }
    if (!this.db.has('uploadSetting').value()) {
      this.db.set('uploadSetting', {}).write();
    }
    if (!this.db.has('accountSetting').value()) {
      this.db.set('accountSetting', {}).write();
    }
    if (!this.db.has('baseSetting').value()) {
      this.db.set('baseSetting', {}).write();
    }
    if (!this.db.has('dataFilePath').value()) {
      this.db.set('dataFilePath', dataFile).write();
    }
    if (!this.db.has('filterImageForm').value()) {
      this.db.set('filterImageForm', {}).write();
    }
  }

  read() {
    return this.db.read();
  }

  get(key = '') {
    return this.read().get(key).value();
  }

  set(key: string, value: any) {
    return this.read().set(key, value).write();
  }

  has(key: string) {
    return this.read().has(key).value();
  }

  insert(key: string, value: any): void {
    // @ts-ignore
    return this.read().get(key).insert(value).write();
  }

  unset(key: string, value: any): boolean {
    return this.read().get(key).unset(value).value();
  }

  getById(key: string, id: string) {
    // @ts-ignore
    return this.read().get(key).getById(id).value();
  }

  removeById(key: string, id: string) {
    // @ts-ignore
    return this.read().get(key).removeById(id).write();
  }
}

export default new DB();
