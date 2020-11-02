import React, { useState, useEffect } from "react";
import "./Main.scss";

function Main() {
  const [alldog, setAlldog] = useState([]);
  const [dogInfo, setDogInfo] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchBtnClick, setSearchBtnClick] = useState(false);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((res) => Object.keys(res.message))
      .then((res) => setAlldog(res));
  }, []);

  useEffect(() => {
    if (searchBtnClick === true && alldog.includes(searchText)) {
      fetch(`https://dog.ceo/api/breed/${searchText}/images/random/30`)
        .then((res) => res.json())
        .then((res) => setDogInfo(res.message));
    } else if (searchBtnClick === true && !alldog.includes(searchText)) {
      alert("입력하신 이름과 일치하는 결과가 없습니다.");
    }
  }, [alldog, searchBtnClick, searchText]);

  const dogSearch = (e) => {
    setSearchText(e.target.value);
    setSearchBtnClick(false);
  };

  const btnClick = () => {
    setSearchBtnClick(true);
  };

  const enterKeyPress = (e) => {
    if (e.key === "Enter") {
      btnClick();
    }
  };

  return (
    <div className="Main">
      <h3 className="title">Dog Search!</h3>
      <p>검색 가능한 단어</p>
      <div className="dog-name-layout">
        {alldog &&
          alldog.map((name, idx) => (
            <p className="dog-name" key={idx}>
              {name}
            </p>
          ))}
      </div>
      <section className="input-form">
        <span>입력해주세요.</span>
        <input
          className="search-input"
          placeholder="Dog Search"
          onChange={dogSearch}
          onKeyPress={enterKeyPress}
        ></input>
        <button className="serch-btn" type="button" onClick={btnClick}>
          검색
        </button>
      </section>
      <div className="ImgLayout">
        {dogInfo &&
          dogInfo.map((dog, idx) => {
            const lastDog = idx === dogInfo.length - 1;
            return (
              <img
                className={`dogImg ${lastDog && "last"}`}
                src={dog}
                alt={idx}
                key={idx}
              ></img>
            );
          })}
      </div>
    </div>
  );
}

export default Main;
