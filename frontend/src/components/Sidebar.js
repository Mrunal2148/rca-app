import React from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaWpforms, FaList, FaBrain, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; 
import './Sidebar.css'; 

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item">
          <Link to="/">
            <FaHome size={50} />
            <span className="icon-text">Home</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/RCAForm">
            <FaWpforms size={50} />
            <span className="icon-text">Form</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/RCAList">
            <FaList size={50} />
            <span className="icon-text">List</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/pdf-question">
            <FaBrain size={50} />
            <span className="icon-text">Insights</span>
          </Link>
        </li>
        {/* <li className="sidebar-item">
          <Link to="/about">
            <FaInfoCircle size={50} />
            <span className="icon-text">About</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/contact">
            <FaEnvelope size={50} />
            <span className="icon-text">Contact</span>
          </Link>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
