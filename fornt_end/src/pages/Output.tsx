import { BrowserRouter, Link, Route } from "react-router-dom";
import Social from "../components/Social";
import axios from "axios";
import { useState } from "react";
import EmptyPage from "./EmptyPage";

export default function Output(props: any) {
  //const url: string = "http://54.67.69.32:80/";
  //console.log(props.location.state);
  const aiData = props.location.state.data;
  console.log(aiData);

  const [myImage, setMyImage] = useState("");

//   const imgurl: string = "http://93fb-121-66-139-243.ngrok.io";
//    try {
//     axios
//       .get<Blob>(imgurl, { responseType: "blob" }) //
//       .then((res) => {
//         const myFile = new File([res.data], "imageName");
//         const reader = new FileReader();
//         reader.onload = (ev) => {
//           const previewImage = String(ev.target?.result);
//           setMyImage(previewImage); // myImage라는 state에 저장했음
//         };
//         reader.readAsDataURL(myFile);
//       }).catch(function(e){
//         console.log(e);
//         alert(`에러가 발생했어요😥 페이지 새로고침 후 다시 이용해주세요.
// 문제가 지속될 시 관리자에게 문의 바랍니다🙏`);
//       })
//   } catch (e) {
//     console.log(e);
//     alert(`에러가 발생했어요😥 페이지 새로고침 후 다시 이용해주세요.
// 문제가 지속될 시 관리자에게 문의 바랍니다🙏`);
//   }

  return (
    <div className="output">
      <h1>오늘 당신의 무드는!</h1>
      {/* {<img className="preview" src={`${myImage}`} />} */}
      {aiData &&
        aiData.products.map((aiData: any) => (
          <div key={props.location.state.id}>
            <p>{aiData.data[0]["무드1-클래식"]}</p>
          </div>
        ))}
      {/*data.map((data) => (
        <div key={data.id}>
          <img className="output-img" src={data.image} />
          <p>오늘 당신의 무드는 </p>
          <p>🕶 우주 최강 힙스터 무드 🕶</p>
          <p>
            <p>{data[1]}%</p>
            <p>{data[2]}%</p>
            <p>{data[3]}%</p>
            <p>{data[4]}%</p>
            <p>{data[5]}%</p>
            <p>{data[6]}%</p>
            <p>{data[7]}%</p>
          </p>
          설명~~
        </div>
      ))*/}
      <Social />
      <div className="button">
        <Link to="/" className="text-link">
          다시 테스트하기
        </Link>
      </div>
    </div>
  );
}
