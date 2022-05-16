import { Link } from "react-router-dom";
import Social from "../components/Social";

export default function Home() {
  const FlaskUrl: string = "";
  return (
    <div className="home">
      <h2>How Do I Look?</h2>
      <div>
        ai 하두알룩에게,
        <br />
        당신의 데일리룩 무드분석을 요청해보세요!
      </div>

      <img
        className="ai-img"
        src="https://cdn-icons-png.flaticon.com/512/6604/6604268.png"
        alt="ai HADOALOOK"
      />
      <div>현재 -명이 참여했어요</div>
      <Social />

      <div>
        <Link to="/upload" className="text-link button">
          분석 요청하기🤖
        </Link>
      </div>
      
    </div>
  );
}
