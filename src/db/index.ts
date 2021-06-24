/* eslint-disable @typescript-eslint/ban-ts-comment */
import Datastore from 'lowdb';
// @ts-ignore
import LodashId from 'lodash-id';
import FileSync from 'lowdb/adapters/FileSync';
import fs from 'fs-extra';
import { remote, app } from 'electron';
import { join } from 'path';

const APP = process.type === 'renderer' ? remote.app : app;
const USERDATA_PATCH = APP.getPath('userData');
const dataFile = join(USERDATA_PATCH, './data.json');
// console.log(`dataFile`, dataFile);

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(USERDATA_PATCH)) {
    fs.mkdirpSync(USERDATA_PATCH);
  }
}

class DB {
  private db: Datastore.LowdbSync<Datastore.AdapterSync>;

  constructor() {
    const adapter = new FileSync(dataFile);
    this.db = Datastore(adapter);
    this.db._.mixin(LodashId);

    if (!this.db.has('images').value()) {
      this.db.set('images', []).write();
    }
    if (!this.db.has('baseInfo').value()) {
      this.db.set('baseInfo', {}).write();
    }
    if (!this.db.has('setting').value()) {
      this.db.set('setting', {}).write();
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
