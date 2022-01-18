import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Elements from "./Elements";
import Nodes from "./Nodes";
import Members from "./Members";
import Materials from "./Materials";
import Sections from "./Sections";

// tha boune epipleon ta loads

const Selections = () => {
  return (
    <div className="selections">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" exact component={Elements} />
          <Route path="/nodes" component={Nodes} />
          <Route path="/members" component={Members} />
          <Route path="/materials" component={Materials} />
          <Route path="/sections" component={Sections} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
};

export default Selections;