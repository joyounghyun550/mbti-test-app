import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-primary-color mb-6 text-center">
          회원가입
        </h1>
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
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          ></input>
          <button className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-secondary-color transition duration-300 hover:text-[#FF5A5F]">
            회원가입
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link className="text-primary-color hover:underline" to="/login">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
