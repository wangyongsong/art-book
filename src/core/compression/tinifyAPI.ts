import request from './tinifyAxios';

export default function tinifyCompression(url: string, data: any) {
  console.log(`data`, data);
  return request({
    method: 'POST',
    url: `/shrink`,
    data: {
      source: {
        url: 'https://tinypng.com/images/panda-happy.png',
      },
    },
  });
}
