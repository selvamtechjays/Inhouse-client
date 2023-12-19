// Sidebar.js

import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./sidebar.css";
import { DashboardContent } from "../../Dashboard/DashboardContent";
import { ProjectsContent } from "../../Projects/ProjectsContent";
import { EmployeesContent } from "../../Employees/EmployeesContent";
import TeamContent from "../../Team/TeamContent";
import IconBar from "./canvas";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const closeBtn = document.querySelector("#btn");

    if (isOpen) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    menuBtnChange();
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <Row className="app-container clearfix">
      <Col xs={12} md={12} className={`top-bar ${isOpen ? "open" : ""}`}>
        <span className="top-bar-title">My App</span>
        <div className="top-bar-actions">
        <IconBar/>
        </div>
      </Col>

      <Col xs={12} md={2} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo_details">
          <i
            className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
            id="btn"
            onClick={toggleSidebar}
          ></i>
        </div>
        <ul className="nav-list">
          <li>
            <a href="#" onClick={() => handleSectionClick("dashboard")}>
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionClick("projects")}>
              <i className="bx bx-folder"></i>
              <span className="link_name">Projects</span>
            </a>
            <span className="tooltip">Projects</span>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionClick("employees")}>
              <i className="bx bx-user"></i>
              <span className="link_name">Team Members</span>
            </a>
            <span className="tooltip">Team Members</span>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionClick("team")}>
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Tracker</span>
            </a>
            <span className="tooltip">Tracker</span>
          </li>
          <li className="profile">
            <div className="profile_details">
              <div className="profile_content">
                <div className="name text-center">Logout</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out"></i>
          </li>
        </ul>
      </Col>
  

      <Col xs={12} md={9} className="content-container d-flex align-items-center justify-content-center" style={{marginTop:"100px",marginLeft:"300px"}}>
        {/* Render content based on the active section */}
        {activeSection === "dashboard" && <DashboardContent />}
        {activeSection === "projects" && <ProjectsContent />}
        {activeSection === "employees" && <EmployeesContent />}
        {activeSection === "team" && <TeamContent />}
      </Col>
    </Row>
  );
};

export default Sidebar;



