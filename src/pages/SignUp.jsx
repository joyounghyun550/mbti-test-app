import { Link } from "react-router-dom";
import AuthForm from "../components/common/AuthForm";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-primary-color mb-6 text-center">
          회원가입
        </h1>
        <AuthForm mode="signup" />
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
