import React, { useEffect } from "react";
declare global {
  interface Window {
    Kakao: any;
  }
}
const KakaoShareButton = () => {
  useEffect(() => {
    createKakaoButton();
  }, []);

  const url: string = "http://www.motd.r-e.kr/";

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "ai가 데일리룩을 분석해준다?",
          description: "#mood #ootd",
          imageUrl: url, // i.e. process.env.FETCH_URL + '/logo.png'
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: "ai에게 데일리룩 무드 분석 맡기기!",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    }
  };
  return (
    <button id="kakao-link-btn" className="share-btn">
      <img src="images/kakao-talk.png" alt="kakao-share-icon" />
    </button>
  );
};
export default KakaoShareButton;
