import { useEffect, useState } from "react";
import TestForm from "../components/Test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../contansts/queryKeys";
import useGetInfo from "../hook/useGetInfo";
import { getUserProfile } from "../api/auth";

const TestPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const queryClient = useQueryClient();
  const { data } = useGetInfo([QUERY_KEYS.PROFILE], getUserProfile);

  const addMutation = useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS],
      });
    },
  });

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY); // 카카오 앱 키를 입력하세요
    }
  }, []);

  // 카카오톡 공유 기능
  const shareToKakao = () => {
    if (window.Kakao.isInitialized()) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: result,
          description: mbtiDescriptions[result],
          imageUrl:
            "https://i.namu.wiki/i/thSCyTKlYyQouIvkvzBMCqlAA-a0rhTMsx5sL1al68opHj8e4Fx-5xiJNLIrHD1kgsud8GkoCWqRLj6UtAQZgg.webp", // 공유할 이미지 URL
          link: {
            mobileWebUrl: window.location.href, // 현재 페이지 URL을 공유
            webUrl: window.location.href,
          },
        },
      });
    }
  };

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);

    // 서버에 전송할 데이터 형태로 변환
    const testResultData = {
      nickname: data?.nickname, // 닉네임
      result: mbtiResult, // MBTI 결과값
      visibility: true, // 기본적으로 공개 설정
      date: new Date().toISOString().split("T")[0], // yyyy-MM-dd 형식 날짜
      userId: data?.id, // 현재 사용자 ID
    };
    try {
      await addMutation.mutate(testResultData);
    } catch (error) {
      console.error("테스트 결과 저장 실패:", error);
    }
    setResult(mbtiResult);
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
              className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#00a699]"
            >
              결과 페이지로 이동하기
            </button>
            <button
              onClick={shareToKakao} // 카카오톡 공유 버튼 클릭 시 호출
              className="w-full bg-secondary-color text-white py-3 rounded-lg font-semibold hover:bg-secondary-dark transition duration-300 hover:text-[#FF5A5F] mt-4"
            >
              공유하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
