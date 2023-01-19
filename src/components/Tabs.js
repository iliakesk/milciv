import React, { useState } from "react";
import { Route, Routes, NavLink, Navigate, useNavigate } from "react-router-dom";
import Nodes from "./Nodes";
import Members from "./Members";
import Materials from "./Materials";
import Sections from "./Sections";
import Elements from "./Elements";
import Overview from "./Overview";




const Tabs = () => {
    const components = {
        Nodes,
        Members,
        Materials,
        Sections
    };


    const [activeTab, setActiveTab] = useState("Nodes");

    const handleNodes = () => {setActiveTab("Nodes");};
    const handleMembers = () => {setActiveTab("Members");};
    const handleMaterials = () => {setActiveTab("Materials");};
    const handleSections = () => {setActiveTab("Sections");};

    const handleContent = (activeTab) => {
        const ActiveTab = components[activeTab]
        return <ActiveTab />
    }
  return (
  <div className="modelling">
      <ul className="nav">
        <li className={activeTab === "Nodes" ? "active" : ""} onClick={handleNodes}>Nodes</li>
        <li className={activeTab === "Members" ? "active" : "" } onClick={handleMembers}>Members</li>
        <li className={activeTab === "Materials" ? "active" : ""} onClick={handleMaterials}>Materials</li>
        <li className={activeTab === "Sections" ? "active" : "" } onClick={handleSections}>Sections</li>
      </ul>
      {handleContent(activeTab)}
      </div>
  );
};

export default Tabs;