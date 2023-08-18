import "./Home.css";
import curry from "../static/curry.svg";
import beef from "../static/beef.svg";
import { Link } from "react-router-dom";
import arrow from "../static/arrow.svg"
import Fade from "react-reveal/Fade";
import Flash from "react-reveal/Flash";


function Home() {
    return (
        <div className="Home">
            <div className="arrow-right">
                <Link to = "/menuitem/1"><p><img src={arrow} alt="None"></img></p></Link>
            </div>
            <div className="home-image">
                <img src={curry} className="bottom-left" alt="None"/>
            </div>
            <div className="home-image">
                <img src={beef} className="top-right" alt="None"/>
            </div>
            <Fade top>
            <div className="home-text">
                    <h1 className="title">College Recipes</h1>
                    <h2 className="name">Brandon Wu</h2>
            </div>
            <div className="home-selections">
                   <Link className="home-menu-selection" to = "/menu"><p> &bull; Menu</p></Link>
                   <a className="home-add-selection" href="https://docs.google.com/document/d/1ZDGgAvbnsljLeKQX5uzYeCCaZibr7ocsCCtC2rvAcbs/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><p> &bull; Add Recipe</p></a>
                   <a className="home-about-selection" href="https://brandonwu32.github.io/" target="_blank" rel="noopener noreferrer"><p> &bull; About the Chef</p></a>
            </div>
            </Fade>
        </div>
    )
}

export default Home;