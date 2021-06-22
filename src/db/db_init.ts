import lowDB, { JSONFileSync, LowSync } from 'lowdb';
// import LodashId from 'lodash-id';
import fs from 'fs-extra';
import { remote, app } from 'electron';
import { join } from 'path';

const APP = process.type === 'renderer' ? remote.app : app;
const USERDATA_PATCH = APP.getPath('userData');

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(USERDATA_PATCH)) {
    fs.mkdirpSync(USERDATA_PATCH);
  }
}

class DB {
  private db: lowDB.LowSync;

  constructor() {
    const dataFile = join(USERDATA_PATCH, './data.json');
    const adapter = new JSONFileSync(dataFile);
    this.db = new LowSync(adapter);
    // this.db._.mixins(LodashId)
  }
}

export default new DB();
