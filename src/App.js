import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Menu from './components/Menu';
import FoodItem from './components/FoodItem';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="backdrop">
          backdrop
        </div>
        <div className="frame">
          frame
        </div>
        <div className="nav">
          <NavBar></NavBar>
        </div>
          <Routes>
            <Route path = "/home" element = {<Home reference = "home"/>}></Route>
            <Route path = "/menu" element = {<Menu/>}></Route>
            <Route path = "/menuitem" element = {<FoodItem/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
