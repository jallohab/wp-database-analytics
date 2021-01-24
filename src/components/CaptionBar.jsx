import React, { Component } from "react";
import "./CaptionBar.css";
import Ticker from "react-ticker";

function CaptionBar({ data }) {
  let names = data.map((ele) => {
    return "•     " + ele.name + " - " + ele.age + "     ";
  });
  let text = "";
  data.length === 0
    ? (text = (
        <h1 className="tickertext" style={{ visibility: "hidden" }}>
          placeholder
        </h1>
      ))
    : (text = <h1 className="tickertext">{names}</h1>);
  return (
    <Ticker className="ticker" height={30} speed={10}>
      {({ index }) => <>{text}</>}
    </Ticker>
  );
}

export default CaptionBar;
