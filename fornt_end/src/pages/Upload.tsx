import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Social from "../components/Social";
import styled, { ThemedStyledFunction } from "styled-components";


const Upload = ({ match }: any) => {
  //https://54.67.69.32:443/
  //http://54.67.69.32:80/
  const url: string = "http://13.125.145.101";
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [inputData, setInputData] = useState({
    id: Date.now(),
    gender: "",
    age: "",
    style: "",
  });
  const { id, gender, age, style } = inputData;
  let [aiData, setAiData] = useState([
    {
      id: "",
      mood1: "",
      mood2: "",
      mood3: "",
      mood4: "",
      mood5: "",
      mood6: "",
      mood7: "",
      mood8: "",
    },
  ]);

  const [isShown, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [resData, setResData] = useState(false);

  // 사진 업로드, 사진 미리보기
  const onLoadFile = (e: any) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setFile(file);
    setFileName(fileName);
    setImageSrc(URL.createObjectURL(file));
  };

  // 폼데이터 관리
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // 폼데이터 전송
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", file);
    formData.append("fileName", fileName);
    formData.append("data", JSON.stringify(inputData));
    console.log(JSON.stringify(inputData));
    setLoading(true); // 로딩중 true

    // 서버 axios 통신
    try {
      axios
        .post(url, formData)
        .then((res) => {
          setLoading(false); // 로딩중 false
          console.log("res", res);
          console.log(res.data.mood[0][0]); // 직장인
          aiData = [
            {
              id: res.data.id,
              mood1: res.data.mood[0],
              mood2: res.data.mood[1],
              mood3: res.data.mood[2],
              mood4: res.data.mood[3],
              mood5: res.data.mood[4],
              mood6: res.data.mood[5],
              mood7: res.data.mood[6],
              mood8: res.data.mood[7],
            },
          ];
          setAiData([...aiData]);
          console.log("aiData", typeof aiData, aiData);
          setIsShow(true); // 폼데이터 양식 false, (결과이동페이지 true)
          setResData(true); // 결과 true
        })
        .catch(function (error) {
          setLoading(false);
          if (error.response) {
            alert("응답할 수 없어요😥 페이지 새로고침 후 이용해주세요.");
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            alert("서버에 문제가 생겼어요😥 페이지 새로고침 후 이용해주세요.");
            console.log(error.request);
          } else {
            alert(
              "요청 설정 중에 문제가 발생했어요😥 페이지 새로고침 후 이용해주세요."
            );
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } catch (e) {
      console.log(e);
      alert(
        "에러가 발생했어요😥 페이지 새로고침 후 이용해주세요. 문제가 지속될 시 관리자에게 문의 바랍니다🙏"
      );
    }
  };

  if (loading) {
    return (
      <div>
        <div>
          <h2>ai 하두알룩이</h2>
          <h2>분석하고 있어요!🤖</h2>
          <div className="spinner">
            <ReactLoading
              type="spin"
              color="fff"
              height={"30%"}
              width={"30%"}
            />
          </div>
          {imageSrc && (
            <img className="preview" src={imageSrc} alt="preview-img" />
          )}
        </div>
      </div>
    );
  }

  if (resData) {
    return (
      <div>
        <h1>🤖분석 결과🤖</h1>
        {imageSrc && (
          <img className="preview" src={imageSrc} alt="preview-img" />
        )}
        <div>
          {aiData &&
            aiData.map((item) => (
              <div key={item.id}>
                <h3>당신의 motd는 .. {item.mood1[0]}무드!</h3>
                {item.mood1[1]}
                <br />
                <br />
                <div className="chart">
                  <table>
                    <tbody>
                      <tr>
                        <th>{item.mood1[0]}</th>
                        <td>
                          <Chart>
                            <InChart
                              percent={parseInt(item.mood1[2])}
                            ></InChart>
                          </Chart>
                        </td>
                        <td>{item.mood1[2]}%</td>
                      </tr>
                      <tr>
                        <th>{item.mood2[0]}</th>
                        <td>
                          <Chart>
                            <InChart
                              percent={parseInt(item.mood2[2])}
                            ></InChart>
                          </Chart>
                        </td>
                        <td>{item.mood2[2]}%</td>
                      </tr>
                      <tr>
                        <th>{item.mood3[0]}</th>
                        <td>
                          <Chart>
                            <InChart
                              percent={parseInt(item.mood3[2])}
                            ></InChart>
                          </Chart>
                        </td>
                        <td>{item.mood3[2]}%</td>
                      </tr>
                      <tr>
                        <th>{item.mood4[0]}</th>
                        <td>
                          <Chart>
                            <InChart
                              percent={parseInt(item.mood4[2])}
                            ></InChart>
                          </Chart>
                        </td>
                        <td>{item.mood4[2]}%</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  {item.mood5[0]} {item.mood5[2]}%,{" "}
                  {item.mood6[0]} {item.mood6[2]}%,{" "}
                  {item.mood7[0]} {item.mood7[2]}%,{" "}
                  {item.mood8[0]} {item.mood8[2]}%
                </div>
              </div>
            ))}
          <p>#motd #mood #ootd #갬성 #데일리룩</p>
        </div>

        <Social />
        <div>
          <Link to="/" className="button text-link">
            다시 테스트하기🎈
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="upload" hidden={isShown}>
        <h1>📸사진 업로드</h1>
        <div className="contents">
          <h4>
            데일리룩 사진을 첨부해봐요! 오늘의 무드를 분석해드려요. 전신사진
            업로드 시 정확도가 높아진답니다😎
          </h4>

          <form onSubmit={handleSubmit} encType="multipart/formdata">
            <div className="input">
              <div className="input-gender">
                <h3>성별</h3>
                <label htmlFor="female">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="여자"
                    onChange={onInputChange}
                    required
                  />
                  <span>여성</span>
                </label>
                <label htmlFor="male">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="남자"
                    onChange={onInputChange}
                  />
                  <span>남성</span>
                </label>
              </div>
              <div className="input-age">
                <h3>나이대</h3>
                <label htmlFor="age0">
                  <input
                    type="radio"
                    id="age0"
                    name="age"
                    value="10대미만"
                    onChange={onInputChange}
                    required
                  />
                  <span>10대 미만</span>
                </label>
                <label htmlFor="age10">
                  <input
                    type="radio"
                    id="age10"
                    name="age"
                    value="10대"
                    onChange={onInputChange}
                  />
                  <span>10대</span>
                </label>
                <label htmlFor="age20">
                  <input
                    type="radio"
                    id="age20"
                    name="age"
                    value="20대"
                    onChange={onInputChange}
                  />
                  <span>20대</span>
                </label>
                <label htmlFor="age30">
                  <input
                    type="radio"
                    id="age30"
                    name="age"
                    value="30대"
                    onChange={onInputChange}
                  />
                  <span>30대</span>
                </label>
                <label htmlFor="age40">
                  <input
                    type="radio"
                    id="age40"
                    name="age"
                    value="40대"
                    onChange={onInputChange}
                  />
                  <span>40대</span>
                </label>
                <label htmlFor="age50">
                  <input
                    type="radio"
                    id="age50"
                    name="age"
                    value="50대"
                    onChange={onInputChange}
                  />
                  <span>50대</span>
                </label>
                <label htmlFor="age60">
                  <input
                    type="radio"
                    id="age60"
                    name="age"
                    value="60대이상"
                    onChange={onInputChange}
                  />
                  <span>60대 이상</span>
                </label>
              </div>
              <div className="input-file">
                <h3>사진 선택</h3>
                <input
                  id="file"
                  type="file"
                  name="file"
                  required
                  onChange={onLoadFile}
                />
              </div>
            </div>
            {imageSrc && (
              <img className="preview" src={imageSrc} alt="preview-img" />
            )}
            <div>
              <button type="submit" className="button">
                ai하두알룩에게 사진 보내기🚀
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div hidden={!isShown}></div> */}
    </>
  );
};

interface IPercent {
  percent: number;
}

const Chart = styled.div`
  width: 150px;
  height: 15px;
  background: #f3edf0;
  border-radius: 30px;
`;

const InChart = styled.div`
  width: ${(props: IPercent) => props.percent * 1.5}px;
  height: 15px;
  background: #d9b8ff;
  border-radius: 30px;
`;

export default Upload;
