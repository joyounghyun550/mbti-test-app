import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/common/Header";
import TestPage from "../pages/TestPage";
import TestResults from "../pages/TestResults";

// 로그인이 되어있지 않은 사용자는 login 페이지로 이동
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

// 로그인이 되어있는 사용자는 Home으로 이동
const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route
            path="/test-page"
            element={<PrivateRoute element={TestPage} />}
          />
          <Route
            path="/test-results"
            element={<PrivateRoute element={TestResults} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
