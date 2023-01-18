import React from "react";
import { Route, Routes, NavLink, Navigate, useNavigate } from "react-router-dom";
import Nodes from "./Nodes";
import Members from "./Members";
import Materials from "./Materials";
import Sections from "./Sections";
import Elements from "./Elements";
import Overview from "./Overview";




const Modelling = () => {
  
  return (
    <div className="modelling">
      
      <Routes>
        <Route exact path='/' element={<Overview />} />
        <Route path='/nodes' element={<Nodes/>} />
        <Route path='/members' element={<Members/>} />
        <Route path='/materials' element={<Materials />} />
        <Route path='/sections' element={<Sections />} />
        <Route path='/elements' element={<Elements />} />
      </Routes>
    </div>
  );
};

export default Modelling;

