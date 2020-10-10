import React, { useState, useEffect } from "react";
import "./ImgLayout.scss";

function ImgLayout(props) {
  const dogImg = props.dogInfo;

  return (
    <div className="ImgLayout">
      {dogImg &&
        dogImg.map((dog, idx) => (
          <img
            className={`dogImg num${idx}`}
            src={dog}
            alt={idx}
            key={idx}
          ></img>
        ))}
    </div>
  );
}

export default ImgLayout;
