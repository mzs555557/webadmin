import axios from 'axios';

const Host = 'http://localhost:8888';
const instance = axios.create({
  withCredentials: true,
  baseURL: Host,
});

export default instance;
