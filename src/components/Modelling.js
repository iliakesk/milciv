import React from "react";
import { Route, Routes } from "react-router-dom";
// import Overview from "./Overview";
import Nodes from "./Nodes";
import Members from "./Members";
import Materials from "./Materials";
import Sections from "./Sections";
import Nodeprops from "./Nodeprops";



const Modelling = () => {
  return (
    <div className="modelling">
      <Routes>
        <Route path='/nodes' element={<Nodes/>} />
        <Route path='/members' element={<Members/>} />
        <Route path='/materials' element={<Materials />} />
        <Route path='/sections' element={<Sections />} />
        <Route path='/nodeprops' element={<Nodeprops />} />
      </Routes>
    </div>
  );
};

export default Modelling;

//<Route exact path='/' element={<Overview />} />
