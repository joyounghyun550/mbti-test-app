import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full bg-gray-100 flex flex-col justify-between">
      <header className="bg-primary-color p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center text-white">
          <Link to="/" className="text-lg font-semibold">
            홈
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-300">
              로그인
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
