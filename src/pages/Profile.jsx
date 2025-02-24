// Profile.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../api/auth";
import { QUERY_KEYS } from "../contansts/queryKeys";
import useGetInfo from "../hook/useGetInfo";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const queryClient = useQueryClient();
  const { data } = useGetInfo([QUERY_KEYS.PROFILE], getUserProfile);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROFILE],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfileMutation.mutateAsync({ nickname });
      alert("업데이트 성공!");
    } catch (error) {
      alert(error.response?.data?.message || "오류가 발생했습니다.");
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
