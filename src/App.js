import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Map from "./components/Map";
// eslint-disable-next-line
import React, { Component } from "react";

export default function App() {
  return (
    <>
      <NavigationBar />
      <Map></Map>
    </>
  );
}
