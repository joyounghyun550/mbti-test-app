import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/bearsStore";
import { ALERT_TYPE } from "../../contansts/alertConstant";
import { alert } from "../../utils/alert";
import Swal from "sweetalert2";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { WARNING } = ALERT_TYPE;
  const alertConsole = alert();

  const handleLogout = () => {
    alertConsole({
      type: WARNING,
      content: "정말로 로그아웃 하시겠습니까?",
    }).then((result) => {
      if (result.isConfirmed) {
        // 승인 알림 표시
        Swal.fire({
          title: "로그아웃이 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "rgb(150, 150, 150)",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        logout(); // 로그아웃 처리
        navigate("/login"); // 로그아웃 후 로그인 페이지로 리다이렉트
      }
    });
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col justify-between">
      <header className="bg-primary-color p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center text-white">
          <Link to="/" className="text-lg font-semibold">
            홈
          </Link>
          <div className="space-x-4">
            {!isAuthenticated ? (
              <Link to="/login" className="hover:text-gray-300">
                로그인
              </Link>
            ) : (
              <>
                <Link to="/profile" className="hover:text-gray-300">
                  프로필
                </Link>
                <Link to="/test-page" className="hover:text-gray-300">
                  테스트
                </Link>
                <Link to="/test-results" className="hover:text-gray-300">
                  결과보기
                </Link>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
