import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Dropdown,
} from "react-bootstrap";
import "./project.css";
import { CiFilter } from "react-icons/ci";
import ProjectForm from "./ProjectForm";

export const ProjectsContent = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const openForm = (project) => {
    setProjectToEdit(project); // This line has been moved to here
    setFormOpen(true);
  };

  const closeForm = () => {
    setProjectToEdit(null);
    setFormOpen(false);
  };

  const handleAddProject = (newProject, isEdit) => {
    if (isEdit) {
      // If editing, update the project in the state
      const updatedProjects = projects.map((project) =>
        project.id === projectToEdit.id ? newProject : project
      );
      setProjects(updatedProjects);
    } else {
      // If adding new, add the project to the state with a unique id
      setProjects((prevProjects) => [...prevProjects, { ...newProject, id: Date.now() }]);
    }
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Projects</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px", backgroundColor: "#500933" }}>
            Add Project
          </Button>
        </Col>
        <Row className="mb-2 justify-content-start">
          <Col md="auto" className="text-start">
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "15px", backgroundColor: "rgb(201, 192, 192)", color: "black" }}
                id="dropdown-basic"
              >
                <CiFilter /> Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Project Name</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Client Name</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Start Date</Dropdown.Item>
                <Dropdown.Item href="#/action-4">End Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto" className="text-start ">
            <Form.Control type="text" placeholder="🔍Search..." style={{ width: "200px" }} />
          </Col>
        </Row>
      </Row>
      <div className="table-container">
      <div className="table-heading">
        <div className="table-cell">Project Name</div>
        <div className="table-cell">Client Name</div>
        <div className="table-cell">Start Date</div>
        <div className="table-cell">End Date</div>
        <div className="table-cell">Project Type</div>
        <div className="table-cell">Resources</div>
        <div className="table-cell">Action</div>
      </div>
      <div className="table-body">
        {projects.map((project, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">{project.projectName}</div>
            <div className="table-cell">{project.clientName}</div>
            <div className="table-cell">{project.startDate}</div>
            <div className="table-cell">{project.endDate}</div>
            <div className="table-cell">{project.projectType}</div>
            <div className="table-cell">{project.resources}</div>
            <div className="table-cell">
              <Button variant="success" style={{ fontSize: "12px" }} onClick={() => openForm(project)}>
                Edit
              </Button>{" "}
              <Button variant="danger" style={{ fontSize: "12px" }} onClick={() => handleDeleteProject(index)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
      <ProjectForm show={isFormOpen} handleClose={closeForm} handleAddProject={handleAddProject} projectToEdit={projectToEdit} />
    </Container>
  );
};
