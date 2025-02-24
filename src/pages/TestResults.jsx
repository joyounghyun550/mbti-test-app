import { useContext } from "react";
import { getTestResults } from "../api/testResults";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../contansts/queryKeys";
import TestItem from "../components/Test/TestItem";

const TestResults = () => {
  const { user } = useContext(AuthContext);

  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEYS.RESULTS],
    queryFn: getTestResults,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // 필터링된 결과 계산
  const filteredResults = data.filter((result) => {
    return result.visibility === true || (user && result.userId === user.id);
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
