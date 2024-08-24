import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8003',
});
export default axiosApi;