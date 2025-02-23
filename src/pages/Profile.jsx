// Profile.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, nicknameUpdate } = useContext(AuthContext);
  const [nickname, setNickname] = useState(user?.nickname || "");

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await nicknameUpdate({ nickname });
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
          <label>닉네임: {user?.nickname || "불러오는 중..."}</label>
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
