import "./App.css";

import React from "react";
import Map from "./components/Map";
import CaptionBar from "./components/CaptionBar";
import NavigationBar from "./components/NavigationBar";

export default function App() {
  return (
    <>
      <NavigationBar />
      <Map />
    </>
  );
}
