import { useContext, useState } from "react";
import TestForm from "../components/Test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);

    // 서버에 전송할 데이터 형태로 변환
    const testResultData = {
      id: crypto.randomUUID, // 게시글 ID
      nickname: user?.nickname, // 닉네임
      result: mbtiResult, // MBTI 결과값
      visibility: true, // 기본적으로 공개 설정
      date: new Date().toISOString().split("T")[0], // yyyy-MM-dd 형식 날짜
      userId: user?.id, // 현재 사용자 ID
    };
    try {
      await createTestResult(testResultData);
      setResult(mbtiResult);
    } catch (error) {
      console.error("테스트 결과 저장 실패:", error);
    }
  };

  const handleNavigateToResults = () => {
    navigate("/test-results");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
