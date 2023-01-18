import React from "react";
import Load from "./Load.js";
// import Edit from "./Edit.js";
// import Help from "./Help.js";
// import Auth from "./Auth.js";
// import logo from "../logo.png";

const TopBar = () => {
  return (
    <div className="topbar">
        <nav className="navbar">
          <a className="logolink" href="#top">
            <img className="logo" src="favpng2.png" alt="logo here"></img>
            <div>
              <span>milSTAT</span>
              <span>Design Solutions</span>
            </div>
          </a> 
          <div className="navlinks">
              <ul>
                  <li>
                      <a href="/nodes">Home</a>
                  </li>
                  <li>
                      <a href="/node">About us</a>
                  </li>
                  <li>
                      <a href="/node">Contact</a>
                  </li>
              </ul>
            </div>
          <Load />
        </nav>
      </div>
      
  );
};

export default TopBar;



