import { create } from "zustand";
import { apiLogin, getUserProfile } from "../api/auth";

const useAuthStore = create((set) => ({
  isAuthenticated: !!sessionStorage.getItem("accessToken"),
  user: null,
  login: async (userData) => {
    try {
      const data = await apiLogin(userData);
      console.log(data);
      if (data.accessToken) {
        set({ isAuthenticated: true });
        const userProfile = await getUserProfile();
        set({ user: userProfile });
      } else {
        set({ isAuthenticated: false });
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      set({ isAuthenticated: false });
    }
  },
  logout: () => {
    sessionStorage.removeItem("accessToken");
    set({ isAuthenticated: false, user: null });
  },
  fetchUserProfile: async () => {
    try {
      const userProfile = await getUserProfile();
      set({ user: userProfile });
    } catch (error) {
      console.error("사용자 프로필 불러오기 오류:", error);
    }
  },
}));

export default useAuthStore;
