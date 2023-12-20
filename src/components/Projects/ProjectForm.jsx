// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./project.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProject } from "../../service/allapi";

// ProjectForm component definition
const ProjectForm = ({
  show,
  handleClose,
  handleAddProject,
  projectToEdit,
}) => {
  // State to manage project data and form errors
  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    startDate: null,
    endDate: null,
    projectType: "",
    resources: "",
  });
  const [errors, setErrors] = useState({});

  // useEffect hook to populate the form when editing an existing project
  useEffect(() => {
    if (projectToEdit) {
      // If projectToEdit is provided, populate the form with its data
      setProjectData((prevData) => ({
        ...prevData,
        ...projectToEdit,
        startDate: projectToEdit.startDate
          ? new Date(projectToEdit.startDate)
          : null,
        endDate: projectToEdit.endDate ? new Date(projectToEdit.endDate) : null,
      }));
    }
  }, [projectToEdit]);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for date changes
  const handleDateChange = (date, field) => {
    setProjectData((prevData) => ({ ...prevData, [field]: date }));
  };

  // Function to validate the form data
  const validateForm = () => {
    const newErrors = {};

    // Validate Project Name
    if (!projectData.projectName.trim()) {
      newErrors.projectName = "Project Name is required";
    }

    // Validate Client Name
    if (!projectData.clientName.trim()) {
      newErrors.clientName = "Client Name is required";
    }

    // Validate Start Date
    if (!projectData.startDate) {
      newErrors.startDate = "Start Date is required";
    }

    // Validate End Date
    if (!projectData.endDate) {
      newErrors.endDate = "End Date is required";
    }

    // Validate Project Type
    if (!projectData.projectType.trim()) {
      newErrors.projectType = "Project Type is required";
    }

    // Validate Resources
    if (!projectData.resources.trim()) {
      newErrors.resources = "Resources are required";
    }

    // Validate End Date
    if (!projectData.endDate) {
      newErrors.endDate = "End Date is required";
    } else if (
      projectData.startDate &&
      projectData.endDate < projectData.startDate
    ) {
      newErrors.endDate = "End Date cannot be earlier than Start Date";
    }

    // Set errors and return true if there are no errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle saving the project
  const handleSave = async () => {
    console.log(projectData);

    // API call to add/edit project
    const response = await addProject(projectData);
    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        // Additional actions after successful save
      }, 1500);
    } else {
      toast.error(response.data.message);
    }

    // Validate form before saving
    if (validateForm()) {
      // If editing, update the project in the parent component
      // If adding new, add the project to the parent component
      handleAddProject(projectData, !!projectToEdit);

      // Clear the form data after successful submission
      setProjectData({
        projectName: "",
        clientName: "",
        startDate: null,
        endDate: null,
        projectType: "",
        resources: "",
      });

      // Close the form modal
      handleClose();
    }
  };

  // JSX rendering
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {projectToEdit ? "Edit Project" : "Add Project"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {/* First Column */}
            <Col>
              <Form.Group controlId="formProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
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

              {/* ... Additional Form Groups ... */}

            </Col>

            {/* Second Column */}
            <Col>
              <Form.Group controlId="formClientName">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
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

              {/* ... Additional Form Groups ... */}

            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSave}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectForm;
