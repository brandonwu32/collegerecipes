import "./Home.css";
import curry from "../static/curry.svg";
import beef from "../static/beef.svg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="Home">
            <div className="home-image">
                <img src={curry} className="bottom-left" alt="None"/>
            </div>
            <div className="home-image">
                <img src={beef} className="top-right" alt="None"/>
            </div>
            <div className="home-text">
                <h1 className="title">College Recipes</h1>
                <h2 className="name">Brandon Wu</h2>
            </div>
            <div className="home-selections">
                   <Link className="home-menu-selection" to = "/menu"><p> &bull; Menu</p></Link>
                   <Link className="home-add-selection" to = "/add"><p> &bull; Add Recipe</p></Link>
                   <Link className="home-about-selection" to = "/about"><p> &bull; About the Chef</p></Link>
            </div>

        </div>
    )
}

export default Home;