import "./App.css";
import NavigationBar from './components/NavigationBar'
import Map from "./components/Map";
import CaptionBar from "./components/CaptionBar";
// eslint-disable-next-line
import React, { Component } from 'react'; 

<<<<<<< HEAD
=======
function App() {
  return (
    <React.StrictMode>
    <NavigationBar />
  </React.StrictMode>
  );

=======
import React from "react";
import Map from "./components/Map";
import "./App.css";

>>>>>>> d2ea724d432929f1bdb7b992c1ede88438500287
export default function App() {
  return (
    <React.StrictMode>
      <NavigationBar />
      <Map />
      <CaptionBar />
    </React.StrictMode>
  );
}
