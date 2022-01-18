import React from "react";
import { NavLink } from "react-router-dom";
// import Elements from "./Elements";



const Elements = () => {
  return (
    <div className="elements">
      <NavLink className="element-link"  to="/">
          Overview
      </NavLink>
      <div className="input">
        <div>
          Model elements input
        </div>
        <div className="element-links">
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/nodes">
            Nodes
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/members">
            Members
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/materials">
            Materials
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/sections">
            Sections
          </NavLink>
        </div>
      </div>
      <div className="details">
        <div>
          Model element properties
        </div>
        <div className="element-links">
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/nodeprops">
            Nodes
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/members">
            Members
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/materials">
            Materials
          </NavLink>
          <NavLink className="element-link" activestyle = {{backgroundColor:"grey"}} to="/sections">
            Sections
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Elements;