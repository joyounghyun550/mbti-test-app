import { useContext, useState } from "react";
import { register } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode }) => {
  const isLoginMode = mode === "login";
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 처리 함수
  const handleLogin = async () => {
    const success = await login({
      id: formData.id,
      password: formData.password,
    });
    if (success) navigate("/");
  };

  // 회원가입 처리 함수
  const handleRegister = async () => {
    const success = await register(formData);
    alert("회원가입이 완료되었습니다!");
    if (success) navigate("/login");
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await (isLoginMode ? handleLogin() : handleRegister());
    } catch (error) {
      alert(error.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleInputChange}
        required
        className="w-full p-4 border border-gray-300 rounded-lg"
      />

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleInputChange}
        required
        className="w-full p-4 border border-gray-300 rounded-lg"
      />

      {!isLoginMode && (
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleInputChange}
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}

      <button
        type="submit"
        className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-secondary-color transition duration-300 hover:text-[#FF5A5F]"
      >
        {isLoginMode ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
