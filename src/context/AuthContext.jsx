// AuthContext.jsx
// import { createContext, useEffect, useState } from "react";
// import { apiLogin, getUserProfile } from "../api/auth";

// export const AuthContext = createContext();

// const token = sessionStorage.getItem("accessToken");

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!token);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const fetchUserProfile = async () => {
//         try {
//           const userProfile = await getUserProfile();
//           setUser(userProfile);
//         } catch (error) {
//           console.error("사용자 프로필 불러오기 오류:", error);
//         }
//       };
//       fetchUserProfile();
//     }
//   }, [isAuthenticated]);

//   const login = async (userData) => {
//     try {
//       const data = await apiLogin(userData);
//       if (data.accessToken) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error("로그인 오류:", error);
//       setIsAuthenticated(false);
//     }
//   };

//   const logout = () => {
//     sessionStorage.removeItem("accessToken");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, login, logout, user, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
