// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { apiLogin, getUserProfile, updateProfile } from "../api/auth";

export const AuthContext = createContext();

const token = sessionStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const userProfile = await getUserProfile();
          setUser(userProfile);
        } catch (error) {
          console.error("사용자 프로필 불러오기 오류:", error);
        }
      };
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const login = async (userData) => {
    try {
      const data = await apiLogin(userData);
      if (data.accessToken) {
        sessionStorage.setItem("accessToken", data.accessToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  const nicknameUpdate = async (userData) => {
    try {
      const response = await updateProfile(userData);
      if (response.success) {
        setUser((prevState) => ({ ...prevState, nickname: userData.nickname }));
      } else {
        alert("업데이트에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, nicknameUpdate, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
