import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <Link className="navitem" to = "/"><p>Home</p></Link>
            <Link className="navitem" to = "/menu"><p>Menu</p></Link>
        </div>
    )
}

export default NavBar;