import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "../MainContent.css";

function Home() {
  return (
    <div className="main-content">
      <h1>Home!</h1>
      <Sidebar/>
    </div>
  );
}

export default Home;
