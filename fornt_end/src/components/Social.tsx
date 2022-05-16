import { useEffect } from "react";
import KakaoShareButton from "../components/KakaoShareButton";
import LinkShare from "../components/LinkShare";

export default function Social() {
  const url: string = "http://www.motd.r-e.kr/";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onClickFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  };

  const onClickTwitter = () => {
    window.open(`https://www.twitter.com/intent/tweet?&url=${url}`);
  };

  return (
    <div className="link-icon">
      {/*<a href="#">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
          alt="instagram"
        />
  </a>*/}

      <button onClick={onClickTwitter} className="share-btn">
        <img src="images/twitter.png" alt="twitter" />
      </button>

      <button onClick={onClickFacebook} className="share-btn">
        <img src="images/facebook.png" alt="facebook" />
      </button>
      <KakaoShareButton />
      <LinkShare />
    </div>
  );
}
