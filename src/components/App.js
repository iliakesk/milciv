import React from "react";
// import { BrowserRouter} from "react-router-dom";
import TopBar from "./TopBar";
import ToolBar from "./ToolBar";
import Canvas from "./Canvas";
import Tabs from "./Tabs";
// import Canvas from "./CanvasTesting";
// import Elements from "./Elements";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="app">
      
      <TopBar />
      <ToolBar />
      <div className="main-window">
      <div className="left-tools"></div>
        <Tabs />
        <Canvas />
        <div className="right-tools"></div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;

//<Elements />