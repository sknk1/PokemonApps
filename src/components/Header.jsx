import React from "react";
import {
    Link
} from "react-router-dom";
import "../style/custom.css";
import logo from "../images/pokemon-ball-2.png";

function Header() {
    return(
        <div className="d-flex flex-column flex-md-row align-items-center px-md-4 bg-white custom-navbar">
            <div className="my-0 mr-md-auto font-weight-normal custom-navbar-image">
                <Link to="/"> 
                    <img src={logo} alt="Girl in a jacket" width="500" height="600" /> 
                </Link>
            </div>
            <nav className="my-2 my-md-0 mr-md-3 d-flex flex-row custom-navbar-item">
                <div className="p-2 text-dark" href="#">
                    <Link to="/pokemon-my-list"> My Pokemon List </Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;