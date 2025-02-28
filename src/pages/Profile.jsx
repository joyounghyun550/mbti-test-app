import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { QUERY_KEYS } from "../constants/queryKeys";
import useGetInfo from "../hook/useGetInfo";
import useSmartMutation from "../hook/useSmartMutation";
import Loading from "../components/common/Loading";
import useAuthStore from "../zustand/bearsStore";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  // 유저 정보 가져오기 훅
  // const { data, isPending, isError } = useGetInfo(
  //   [QUERY_KEYS.USER],
  //   getUserProfile
  // );
  const { user: data } = useAuthStore();
  console.log(data);
  // 프로필 업데이트 훅
  const updateMutation = useSmartMutation(updateProfile, [QUERY_KEYS.USER]);

  // if (isPending || isError) {
  //   return <Loading notification={"데이터를 받아오는 중..."} />;
  // }

  if (!data) {
    return <Loading notification={"데이터를 받아오 중..."} />;
  }

  // 프로필 수정 업데이트 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({ nickname });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">
          프로필 수정
        </h1>
        <form
          className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <label>닉네임: {data?.nickname || "불러오는 중..."}</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <button className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-secondary-color transition duration-300 hover:text-[#FF5A5F]">
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
