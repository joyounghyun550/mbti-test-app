import { useContext, useEffect, useState } from "react";
import {
  getTestResults,
  updateTestResultVisibility,
  deleteTestResult,
} from "../api/testResults";
import { AuthContext } from "../context/AuthContext";
import { mbtiDescriptions } from "../utils/mbtiCalculator";

const TestResults = () => {
  const [testResultItems, setTestResultItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTestResults().then(setTestResultItems);
  }, []);

  const filteredResults = testResultItems.filter((result) => {
    return result.visibility === true || (user && result.userId === user.id);
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const handleVisibilityChange = (id) => {
    const result = testResultItems.find((item) => item.id === id);
    if (result) {
      updateTestResultVisibility(id, !result.visibility).then(() => {
        setTestResultItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, visibility: !item.visibility } : item
          )
        );
      });
    }
  };

  const handleDelete = (id) => {
    deleteTestResult(id).then(() => {
      setTestResultItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        모든 테스트 결과
      </h2>
      <div className="space-y-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
          >
            {/* 상단 헤더 섹션 */}
            <div className="flex justify-between items-center">
              {" "}
              {/* 변경됨 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.nickname}
                </h3>
                <span className="text-gray-500 text-sm">
                  {item.result.type}
                </span>
              </div>
              <p className="text-xs text-gray-400 text-right">
                {" "}
                {/* 변경됨 */}
                {formatDate(item.date)}
              </p>
            </div>

            {/* 결과 내용 섹션 */}
            <div className="mt-2 pt-4 border-t pb-8">
              <p className="text-gray-800 text-2xl whitespace-pre-line leading-6 mb-5">
                {item.result}
              </p>
              {mbtiDescriptions[item.result] && (
                <p className="mt-2 text-gray-500 text-sm">
                  {mbtiDescriptions[item.result]}
                </p>
              )}
            </div>

            {/* 오른쪽 하단 버튼 그룹 */}
            {item.userId === user?.id && (
              <div className="absolute bottom-4 right-4 flex gap-4">
                <button
                  onClick={() => handleVisibilityChange(item.id)}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  {item.visibility ? "비공개" : "공개"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
