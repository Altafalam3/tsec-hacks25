import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="btn">WildGuard</h1>
      <ul>
        <li className="sidebar-item">
          <Link to="/track-animal-movements">Track Animal Movements</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/wildfire-detection">Wildfire Detection</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/injury-detection">Injury Detection</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/real-time-alerts">Real-Time Alerts</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/live-alert-map">Live Alert Map</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
