import axios from 'axios';

const baseURL = 'https://api.tinify.com';

const request = axios.create({
  baseURL,
  headers: {
    // Host: 'api.tinify.com',
    Authorization: '2pRQwxR7NCZnsnzL6ZKCDlsWdcZp466d',
    'Content-Type': 'application/json',
    // 'Compression-Count': 1,
  },
});

export default request;
