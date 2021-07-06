import request from './tinifyAxios';

export default function tinifyCompression(data: any) {
  return request({
    method: 'POST',
    url: `/web/shrink`,
    data,
  });
}
