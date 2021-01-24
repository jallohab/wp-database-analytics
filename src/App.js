<<<<<<< HEAD
import "./App.css";
import NavigationBar from './components/NavigationBar'
// eslint-disable-next-line
import React, { Component } from 'react'; 

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

export default function App() {
  return (
    <div className="App">
      <Map></Map>
    </div>
  );
>>>>>>> 26d0950e5c44b6d0beb9beb6cba9f1aefd79f0ef
}
