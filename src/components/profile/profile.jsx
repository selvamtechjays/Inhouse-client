import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import {  useNavigate } from "react-router-dom";
import { DashboardContent } from "../Dashboard/DashboardContent";
import { ProjectsContent } from "../Projects/ProjectsContent";
import { EmployeesContent } from "../Employees/EmployeesContent";
import { TeamContent } from "../Team/TeamContent";


const Profile = ({openSidebarToggle, OpenSidebar}) => {
  

  //State to track the active section (dashboard,projects,employees,team)
  const [activeSection, setActiveSection] = useState("dashboard");

  //State to track the hover effect on buttons
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate()

  //function to handle section changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  //function to handle user logout
  const handleLogout = () => {
    // Clear the email from local storage
    localStorage.removeItem('email');
   
      navigate('/')
  };


//function to get the css class for button styling
  const getButtonClassName = (section) => {
    return `nav-link text-white ${
      activeSection === section ? "active" : ""
    }`;
  };

  

  return (
  
    <Container fluid className="profile-container">
        <aside id="sidebar" >
      <Row className="h-100 ">
        {/* Sidebar */}
        
        
        <Col md={3}  className="dev text-white p-4 h-100" id={openSidebarToggle ? "sidebar-responsive": ""}>
          

        <span className='close mb-2 ' onClick={OpenSidebar} style={{marginTop:'-10px',marginLeft:'40%px'}} >X</span>
          <ul className="nav nav-pills flex-column">
          
            <li
              className={`nav-item mb-2 d-flex align-items-center ms-5 ${getButtonClassName(
                "dashboard"
              )}`}
            >    
           
        
              <button
                className={getButtonClassName("dashboard")}
                onClick={() => handleSectionChange("dashboard")}
                
              >
           
                Dashboard
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ms-5 ${getButtonClassName(
                "projects"
              )}`}
            >
              <button
                className={getButtonClassName("projects")}
                onClick={() => handleSectionChange("projects")}
              
              >
        
                Projects
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ms-5 ${getButtonClassName(
                "employees"
              )}`}
            >
              <button
                className={getButtonClassName("employees")}
                onClick={() => handleSectionChange("employees")}
              
              >
             
               Team Members
              </button>
            </li>
            <li
              className={`nav-item mb-2 d-flex align-items-center ms-5 ${getButtonClassName(
                "team"
              )}`}
            >
              <button
                className={getButtonClassName("team")}
                onClick={() => handleSectionChange("team")}
            
              >
             
                Tracker
              </button>
            </li>

            <li
              className={`nav-item mb-2 d-flex align-items-center ms-5 ${getButtonClassName(
                "logout"
              )}`}
            >
              <button
                className={getButtonClassName("logout")}
                onClick={handleLogout}
            
              >
                
                Logout
              </button>
            </li>
            
          </ul>
        

        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4 bg-light h-100">
          {activeSection === "dashboard" && <DashboardContent OpenSidebar={OpenSidebar} />}
          {activeSection === "projects" && <ProjectsContent OpenSidebar={OpenSidebar} />}
          {activeSection === "employees" && <EmployeesContent OpenSidebar={OpenSidebar} />}
          {activeSection === "team" && <TeamContent OpenSidebar={OpenSidebar} />}
        </Col>
      </Row>
      </aside>
    </Container>
   
  );
};

export default Profile;