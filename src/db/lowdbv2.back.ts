// import { LowSync, JSONFileSync } from 'lowdb';
// import fs from 'fs-extra';
// import { remote, app } from 'electron';
// import { join } from 'path';
// import lodash from 'lodash';

// const APP = process.type === 'renderer' ? remote.app : app;
// const USERDATA_PATCH = APP.getPath('userData');
// const dataFile = join(USERDATA_PATCH, './data.json');
// // console.log(`dataFile`, dataFile);

// if (process.type !== 'renderer') {
//   if (!fs.pathExistsSync(USERDATA_PATCH)) {
//     fs.mkdirpSync(USERDATA_PATCH);
//   }
// }

// type DataType = {
//   images: any[];
//   baseInfo: any;
// };

// class DB {
//   db: LowSync<DataType>;

//   constructor() {
//     this.db = new LowSync(new JSONFileSync<DataType>(dataFile));
//     this.db.read();
//     this.initialize();
//     this.db.chain = lodash.chain(this.db.data);
//   }

//   private initialize() {
//     if (!this.db.data) {
//       Object.assign(this.db, { data: {} });
//     }

//     if (!this.db.data?.images) {
//       Object.assign(this.db.data, { images: [] });
//       this.db.write();
//     }

//     if (!this.db.data?.baseInfo) {
//       Object.assign(this.db.data, { baseInfo: {} });
//       this.db.write();
//     }
//   }

//   read() {
//     // this.db.read();
//     return this.db.data;
//   }

//   get(key = '') {
//     // this.db.read();
//     return this.db.chain.get(key).value();
//   }

//   set(key: string, value: any) {
//     const obj = this.db.data;
//     this.db.chain.set(obj, key, value);
//     console.log(
//       `this.db.chain.set(obj, key, value)`,
//       this.db.chain.set(obj, key, value)
//     );
//     this.db.write();
//     return this.db.data;
//   }
// }

// export default new DB();
