import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">로그인</h1>
        <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <input
            type="text"
            name="id"
            placeholder="아이디"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          ></input>
          <button className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-secondary-color transition duration-300 hover:text-[#FF5A5F]">
            로그인
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">
            계정이 없으신가요?
            <Link className="text-[#FF5A5F] hover:underline" to="/signup">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
