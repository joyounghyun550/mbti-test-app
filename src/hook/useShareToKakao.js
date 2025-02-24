import { useEffect } from "react";

const useShareToKakao = (title, description) => {
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
          title,
          description,
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
  return shareToKakao;
};

export default useShareToKakao;
