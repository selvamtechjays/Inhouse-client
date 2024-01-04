import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./project.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProject } from "../../service/allapi";

const ProjectForm = ({
  show,
  handleClose,
  handleAddProject,
  projectToEdit,
  projectType
}) => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    projectType: "",
    resources: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectToEdit) {
      setProjectData((prevData) => ({
        ...prevData,
        ...projectToEdit,
      }));
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check for resources validation when the field changes
    if (name === "resources") {
      validateResources();
    }

    // Check for name and clientName validation when the fields change
    if (name === "projectName" || name === "clientName") {
      validateNameAndClientName();
    }

    // Check for date validation when either start or end date changes
    if (name === "startDate" || name === "endDate") {
      validateDate();
    }
  };

  const validateDate = () => {
    const newErrors = { ...errors };

    // Validate End Date
    newErrors.endDate =
      projectData.endDate === ""
        ? "End Date is required"
        : projectData.startDate && projectData.endDate < projectData.startDate
        ? "End Date cannot be earlier than Start Date"
        : "";

    setErrors(newErrors);
  };

  const validateResources = () => {
    const newErrors = { ...errors };

    // Validate Resources
    newErrors.resources =
    !/^\d+$/.test(projectData.resources)
      ? "Resources must contain only numeric characters"
      : "";

  setErrors(newErrors);
  };

  const validateNameAndClientName = () => {
    const newErrors = { ...errors };

    // Validate Project Name
    newErrors.projectName =
      !/^[a-zA-Z\s]+$/.test(projectData.projectName)
        ? "Project Name must be a string without numeric characters"
        : "";

    // Validate Client Name
    newErrors.clientName =
      !/^[a-zA-Z\s]+$/.test(projectData.clientName)
        ? "Client Name must be a string without numeric characters"
        : "";

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Project Name
    newErrors.projectName =
      !/^[a-zA-Z\s]+$/.test(projectData.projectName)
        ? "Project Name must be a string without numeric characters"
        : "";

    // Validate Client Name
    newErrors.clientName =
      !/^[a-zA-Z\s]+$/.test(projectData.clientName)
        ? "Client Name must be a string without numeric characters"
        : "";

    // Validate Start Date
    newErrors.startDate = projectData.startDate === "" ? "Start Date is required" : "";

    // Validate End Date
    newErrors.endDate = projectData.endDate === "" ? "End Date is required" : "";

    // Validate Project Type
    newErrors.projectType = projectData.projectType.trim() === "" ? "Project Type is required" : "";

    // Validate Resources
    newErrors.resources =
    !/^\d+$/.test(projectData.resources)
      ? "Resources must contain only numeric characters"
      : "";

    // Validate End Date
    newErrors.endDate =
      projectData.endDate === ""
        ? "End Date is required"
        : projectData.startDate && projectData.endDate < projectData.startDate
        ? "End Date cannot be earlier than Start Date"
        : "";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSave = () => {
    if (validateForm()) {
      if (projectToEdit) {
        handleAddProject(projectData, true);
      } else {
        handleAddProject(projectData, false);
      }

      setProjectData({
        projectName: "",
        clientName: "",
        startDate: "",
        endDate: "",
        projectType: "",
        resources: "",
      });

      handleClose();
    }
  };


    // Function to call the API and get all projects
    const getAllProjects=async()=>{
      const response=await getallProjects(projects)
      setProjects(response.data)
      console.log(projects);
    }
  
  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>{projectToEdit ? "Edit Project" : "Add Project"}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {/* First Column */}
            <Col>
              <Form.Group controlId="formProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control className="hov"
                  type="text"
                  placeholder="Enter project name"
                  name="projectName"
                  value={projectData.projectName}
                  onChange={handleChange}
                  isInvalid={!!errors.projectName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control className="hov"
                  type="date"
                  placeholder="Enter start date"
                  name="startDate"
                  value={projectData.startDate}
                  onChange={handleChange}
                  isInvalid={!!errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate}
                </Form.Control.Feedback>

                <Form.Group controlId="formProjectType">
                  <Form.Label>Project Type</Form.Label>
                  <Form.Select 
                    name="projectType" className="sel hov"
                    value={projectData.projectType}
                    onChange={handleChange}
                    isInvalid={!!errors.projectType}
                  >
                    <option value="">Select Project Type</option>
                    <option value="internal">Internal Project -techjays</option>
                    <option value="external">External Project -client</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.projectType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Col>

            {/* Second Column */}
            <Col>
              <Form.Group controlId="formClientName">
                <Form.Label>Client Name</Form.Label>
                <Form.Control className="hov"
                  type="text"
                  placeholder="Enter client name"
                  name="clientName"
                  value={projectData.clientName}
                  onChange={handleChange}
                  isInvalid={!!errors.clientName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control className="hov"
                  type="date"
                  placeholder="Enter end date"
                  name="endDate"
                  value={projectData.endDate}
                  onChange={handleChange}
                  isInvalid={!!errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate}
                </Form.Control.Feedback>

                <Form.Group controlId="formResources">
                  <Form.Label>Resources</Form.Label>
                  <Form.Control className="hov"
                    type="text"
                    placeholder="Enter resources"
                    name="resources"
                    value={projectData.resources}
                    onChange={handleChange}
                    isInvalid={!!errors.resources}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.resources}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSave}>
          {projectToEdit ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectForm;

