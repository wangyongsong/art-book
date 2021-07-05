import request from './tinifyAxios';

export default function tinifyCompression(url: string, data: any) {
  console.log(`data`, data);
  return request({
    method: 'POST',
    url: `/web/shrink`,
    // responseType: 'arraybuffer',
    data,
  });
}
