import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_SERVER_URL;

// 회원가입 요청
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    throw error;
  }
};

// 로그인 요청
export const apiLogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.accessToken) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    alert("로그인 실패");
    throw error;
  }
};

// 사용자 프로필 가져오기
export const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("프로필 정보를 불러오지 못했습니다:", error);
    throw error;
  }
};

// 프로필 업데이트 (PATCH)
export const updateProfile = async (formData) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    throw error;
  }
};
