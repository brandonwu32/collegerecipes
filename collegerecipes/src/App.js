import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Menu from './components/Menu';

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
            <Route exact path = "/" element = {<Home reference = "home"/>}></Route>
            <Route exact path = "/menu" element = {<Menu/>}></Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
