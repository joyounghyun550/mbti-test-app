import { getTestResults } from "../api/testResults";
import { QUERY_KEYS } from "../constants/queryKeys";
import TestItem from "../components/Test/TestItem";
import useGetInfo from "../hook/useGetInfo";
import { getUserProfile } from "../api/auth";
import Loading from "../components/common/Loading";

const TestResults = () => {
  // 유저 정보 불러오기
  const { data: userInfo } = useGetInfo([QUERY_KEYS.USER], getUserProfile);
  // 테스트 리스트 불러오기
  const { data, isPending, isError } = useGetInfo(
    [QUERY_KEYS.RESULTS],
    getTestResults
  );

  if (isPending || isError) {
    return <Loading notification={"데이터를 받아오는 중..."} />;
  }

  // 필터링된 결과 계산
  const filteredResults = data.filter((result) => {
    return (
      result.visibility === true || (userInfo && result.userId === userInfo.id)
    );
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        모든 테스트 결과
      </h2>
      <div className="space-y-4">
        {filteredResults.map((item) => (
          <TestItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TestResults;
