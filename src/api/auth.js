import AuthApi from "../axios/AuthApi";
import { ALERT_TYPE } from "../contansts/alertConstant";
import { alert } from "../utils/alert";

const { SUCCESS, ERROR } = ALERT_TYPE;
const alertConsole = alert();

// 회원가입 요청
export const register = async (userData) => {
  try {
    const response = await AuthApi.post("/register", userData);
    if (response) {
      alertConsole({
        type: SUCCESS,
        content: "회원가입에 성공하였습니다.",
      });
    }
    return response.data;
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);
    alertConsole({
      type: ERROR,
      content: "회원가입이 실패하였습니다.",
    });
    throw error;
  }
};

// 로그인 요청
export const apiLogin = async (userData) => {
  try {
    const response = await AuthApi.post("/login", userData);
    if (response.data.accessToken) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response) {
      alertConsole({
        type: SUCCESS,
        content: "로그인에 성공하였습니다.",
      });
    }
    return response.data;
  } catch (error) {
    alertConsole({
      type: ERROR,
      content: "로그인이 실패하였습니다.",
    });
    throw error;
  }
};

// 사용자 프로필 가져오기
export const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await AuthApi.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("프로필 정보를 불러오지 못했습니다:", error);
    alertConsole({
      type: ERROR,
      content: "프로필 정보를 불러오지 못했습니다.",
    });
    throw error;
  }
};

// 프로필 업데이트 (PATCH)
export const updateProfile = async (formData) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("로그인이 필요합니다.");

    const response = await AuthApi.patch("/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response) {
      alertConsole({
        type: SUCCESS,
        content: "업데이트에 성공하였습니다.",
      });
    }
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    alertConsole({
      type: ERROR,
      content: "업데이트에 실패하였습니다.",
    });
    throw error;
  }
};
