import { Link } from "react-router-dom";

export default function Header() {
  const FlaskUrl: string = "";
  return (
    <header>
      <div className="title ">
        <Link to="/" className="text-link">
          #MOTD✨
        </Link>
      </div>

      <div
        className="flask"
        onClick={() => {
          window.open(FlaskUrl, "_blank");
        }}
      >
        What's the TREND👀
      </div>
    </header>
  );
}
