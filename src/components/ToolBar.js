import React, {useState} from "react";
import {useNavigate, NavLink } from "react-router-dom";
// import Edit from "./Edit.js";
// import Help from "./Help.js";
// import Auth from "./Auth.js";
// import logo from "../logo.png";




const ToolBar = () => {
  // const [sthOn, setSthOn] = useState(false);
  // const [nodesOn, setNodesOn] = useState(false);
  // const [membersOn, setMembersOn] = useState(false);
  // const [materialsOn, setMaterialsOn] = useState(false);
  // const [sectionsOn, setSectionsOn] = useState(false);
  // const navigate = useNavigate()
  return (
      <div className="toolbar" id="toolbar">
        
        


        <NavLink to="/nodes" className="form-title">Nodes</NavLink>
        <NavLink to="/members" className="form-title">Members</NavLink>
        <NavLink to="/materials" className="form-title">Sections</NavLink>
        <NavLink to="/sections" className="form-title">Materials</NavLink>
      </div>
  );
};




export default ToolBar;