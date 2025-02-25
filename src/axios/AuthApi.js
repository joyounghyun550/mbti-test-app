import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_SERVER_URL;

const AuthApi = axios.create({
  baseURL: API_URL,
});

// 🔹 요청 인터셉터: accessToken 자동 추가
AuthApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 응답 인터셉터: 오류 처리 (예: 토큰 만료 시 로그아웃)
AuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("인증 실패: 로그인 필요");
      alert("로그인이 필요합니다.");
      sessionStorage.removeItem("accessToken"); // 만료된 토큰 제거
      window.location.href = "/login"; // 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);

export default AuthApi;
