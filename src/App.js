import "./App.css";
import NavigationBar from './components/NavigationBar'
import Map from "./components/Map";
import CaptionBar from "./components/CaptionBar";
// eslint-disable-next-line
import React, { Component } from 'react'; 

export default function App() {
  return (
    <React.StrictMode>
      <NavigationBar />
      <Map />
      <CaptionBar />
    </React.StrictMode>
  );
}
