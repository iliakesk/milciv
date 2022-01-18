import React from "react";
import { BrowserRouter} from "react-router-dom";
import TopBar from "./TopBar";
import ToolBar from "./ToolBar";
import Canvas from "./Canvas";
import Modelling from "./Modelling";
// import Canvas from "./CanvasTesting";
// import Elements from "./Elements";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="app">
      
      <BrowserRouter>
      <TopBar />
      <ToolBar />
      <div className="main-window">
        <Modelling />
        <Canvas />
      </div>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default App;

//<Elements />