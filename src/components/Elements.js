import React from "react";
import { NavLink } from "react-router-dom";



const Elements = () => {
  return (
    <div className="elements">
      <div className="model-box">
          <NavLink to="/nodes" className="form-title">Nodes</NavLink>
          <NavLink to="/members" className="form-title">Members</NavLink>
          <NavLink to="/materials" className="form-title">Sections</NavLink>
          <NavLink to="/sections" className="form-title">Materials</NavLink>
      </div>
    </div>
  );
};

export default Elements;