import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../../api/testResults";
import { QUERY_KEYS } from "../../contansts/queryKeys";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const TestItem = ({ item }) => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const updateVisibilityMutation = useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS],
      });
    },
  });

  const deleteTestResultMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RESULTS],
      });
    },
  });

  // 날짜 포맷팅
  const formatDate = (dateString) =>
    new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(dateString));

  const visibilityChangeHandler = async () => {
    try {
      await updateVisibilityMutation.mutateAsync({
        id: item.id,
        visibility: !item.visibility,
      });
    } catch (error) {
      console.error("공개 상태 변경 실패:", error);
    }
  };

  const resultDeleteHandler = async () => {
    try {
      await deleteTestResultMutation.mutateAsync(item.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            {item.nickname}
          </h3>
        </div>
        <p className="text-xs text-gray-400 text-right">
          {formatDate(item.date)}
        </p>
      </div>

      {/* 내용 */}
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

      {/* 버튼 */}
      {item.userId === user?.id && (
        <div className="absolute bottom-4 right-4 flex gap-4">
          <button
            onClick={visibilityChangeHandler}
            className="text-blue-500 hover:text-blue-700 text-xs"
          >
            {item.visibility ? "비공개" : "공개"}
          </button>
          <button
            onClick={resultDeleteHandler}
            className="text-red-500 hover:text-red-700 text-xs"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default TestItem;
