import React from "react";
import Load from "./Load.js";
// import Edit from "./Edit.js";
// import Help from "./Help.js";
// import Auth from "./Auth.js";
// import logo from "../logo.png";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="logo">
        logo
        </div>
        <div className="navbar">
            <ul className="navlinks">
                <li className="navlink">
                    <a href="/nodes">home</a>
                </li>
                <li className="navlink">
                    <a href="/node">about us</a>
                </li>
                <li className="navlink">
                    <a href="/node">contact</a>
                </li>
            </ul>
        </div>
        <Load />
      </div>
      
  );
};

export default TopBar;



