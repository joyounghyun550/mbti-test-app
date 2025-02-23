import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TestInfoCard from "../components/Home/TestInfoCard";
import { testInfoData } from "../data/testInfoData";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext); // AuthContext에서 상태 가져오기
  const navigate = useNavigate();

  const handleStartTest = () =>
    isAuthenticated
      ? navigate("/test-page")
      : (alert("로그인이 필요합니다."), navigate("/login"));

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-primary-color mb-6">
        무료 성격 테스트
      </h1>
      <p className="mb-8 text-lg text-secondary-color">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {testInfoData.map((item, index) => (
          <TestInfoCard key={index} {...item} />
        ))}
      </div>
      <button
        onClick={handleStartTest}
        className="inline-block bg-primary-color text-white py-2 px-6 rounded-full hover:bg-secondary-color transition mb-4 hover:text-[#FF5A5F]"
      >
        내 성격 알아보러 가기
      </button>
    </div>
  );
};

export default Home;
