// api.js 파일 (axios 설정)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // 서버의 URL에 맞게 baseURL 설정
});

export default api;
