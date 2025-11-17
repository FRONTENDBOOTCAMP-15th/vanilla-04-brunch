import axios from 'axios';

const API_SERVER = import.meta.env.VITE_SERVER_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export function getAxios() {
  const instance = axios.create({
    baseURL: API_SERVER, // 기본 URL
    timeout: 1000 * 5, // 5초동안 응답 못받으면 실패
    headers: {
      'Content-Type': 'application/json', // 요청 바디의 데이터 타입
      // 설정하지 않으면 크롬일 경우 "application/json, text/plain, */*"
      Accept: 'application/json', // 응답 바디의 데이터 타입이 json이면 좋겠음
      'Client-Id': CLIENT_ID,
    },
  });

  return instance;
}
