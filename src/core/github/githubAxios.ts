import axios from 'axios';

const baseURL = 'https://api.github.com';

const request = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
