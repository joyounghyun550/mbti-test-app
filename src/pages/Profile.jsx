const Profile = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6">
          프로필 수정
        </h1>
        <form className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <label>닉네임</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          ></input>
          <button className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-secondary-color transition duration-300 hover:text-[#FF5A5F]">
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
