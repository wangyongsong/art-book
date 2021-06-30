import axios from 'axios';

const baseURL = 'https://gitee.com/api/v5';

const request = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
