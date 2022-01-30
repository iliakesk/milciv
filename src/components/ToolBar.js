import React from "react";
import {NavLink} from "react-router-dom";
// import Edit from "./Edit.js";
// import Help from "./Help.js";
// import Auth from "./Auth.js";
// import logo from "../logo.png";

const ToolBar = () => {
  return (
      <div className="toolbar">
          <NavLink to="/nodes" className="tool"><img src="spaicon5.png" alt="tool1"></img></NavLink>
          <NavLink to="/members" className="tool"><img src="spaicon5.png" alt="tool1"></img></NavLink>
          <NavLink to="/materials" className="tool"><img src="spaicon6.png" alt="tool1"></img></NavLink>
          <NavLink to="/sections" className="tool"><img src="spaicon6.png" alt="tool1"></img></NavLink>
          <NavLink to="/nodeprops" className="tool"><img src="spaicon2.png" alt="tool1"></img></NavLink>
          <NavLink to="/nodes" className="tool"><img src="spaicon2.png" alt="tool1"></img></NavLink>
      </div>
  );
};

export default ToolBar;