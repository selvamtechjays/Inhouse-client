// TeamForm.js

// Import necessary React components and hooks
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { addTeams, getallTeams } from "../../service/allapi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initial state for the team form
const initialTeamState = {
  name: "",
  empCode: "",
  techStack: "",
  project: "",
  allocatedPercentage: "",
  priority: "",
};

// TeamForm component for adding/editing team information
const TeamForm = ({ show, handleClose, handleAddTeam, teamToEdit }) => {
  // State variables for managing the component's state
  const [teamData, setTeamData] = useState(initialTeamState); // State for storing team data
  const [errors, setErrors] = useState({}); // State for storing form validation errors

  // Effect hook to update the form data when editing an existing team
  useEffect(() => {
    if (teamToEdit) {
      setTeamData(teamToEdit);
    } else {
      setTeamData(initialTeamState);
    }
  }, [teamToEdit]);

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to validate the form fields
  const validateForm = () => {
    const newErrors = {};

    // Validate name field
    if (!teamData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate empCode field
    if (!teamData.empCode.trim()) {
      newErrors.empCode = "Employee Code is required";
    }

    // Validate techStack field
    if (!teamData.techStack.trim()) {
      newErrors.techStack = "Tech Stack is required";
    }

    // Validate project field
    if (!teamData.project.trim()) {
      newErrors.project = "Project is required";
    }

    // Validate allocatedPercentage field
    if (!teamData.allocatedPercentage.trim()) {
      newErrors.allocatedPercentage = "Allocated Percentage is required";
    } else if (
      isNaN(teamData.allocatedPercentage) ||
      +teamData.allocatedPercentage < 0 ||
      +teamData.allocatedPercentage > 100
    ) {
      newErrors.allocatedPercentage = "Please enter a valid percentage (0-100)";
    }

    // Validate priority field
    if (!teamData.priority.trim()) {
      newErrors.priority = "Priority is required";
    } else if (isNaN(teamData.priority) || +teamData.priority < 1) {
      newErrors.priority = "Please enter a valid priority (greater than 0)";
    }

    // Set validation errors in state
    setErrors(newErrors);

    // Return true if the form is valid, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async() => {
    console.log(teamData);

    //api call
    const response = await addTeams(teamData)
    if (response.status == 200) {
      toast.success(response.data.message);
      getallTeams();
    }else{
     
      toast.error(response.data.message);
    }
    if (validateForm()) {
      // Call the handleAddTeam function to add/edit the team
      handleAddTeam(teamData, !!teamToEdit);
      
            // Clear the form data after adding a new project
            setTeamData({
              name: "",
              empCode: "",
              techStack: "",
              project: "",
              allocatedPercentage: "",
              priority: "",
            });

      handleClose();
    }
  };

  // Render the TeamForm component
  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h2>{teamToEdit ? "Edit Team" : "Add Team"} </h2></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Form input fields */}
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={teamData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="empCode">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee code"
                  name="empCode"
                  value={teamData.empCode}
                  onChange={handleChange}
                  isInvalid={!!errors.empCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.empCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="techStack">
                <Form.Label>Tech Stack</Form.Label>
                <Form.Select
                  name="techStack" className="sel"
                  value={teamData.techStack}
                  onChange={handleChange}
                  isInvalid={!!errors.techStack}
                >
                  <option value="">Select Tech Stack</option>
                  <option value="TechStack1">Tech Stack 1</option>
                  <option value="TechStack2">Tech Stack 2</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.techStack}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Select
                  name="project" className="sel"
                  value={teamData.project}
                  onChange={handleChange}
                  isInvalid={!!errors.project}
                >
                  <option value="">Select Project</option>
                  <option value="Project1">Project 1</option>
                  <option value="Project2">Project 2</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.project}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="allocatedPercentage">
                <Form.Label>Allocated Percentage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter allocated percentage"
                  name="allocatedPercentage"
                  value={teamData.allocatedPercentage}
                  onChange={handleChange}
                  isInvalid={!!errors.allocatedPercentage}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.allocatedPercentage}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  name="priority" className="sel"
                  value={teamData.priority}
                  onChange={handleChange}
                  isInvalid={!!errors.priority}
                >
                  <option value="">Select Priority</option>
                  <option value="1">Senior</option>
                  <option value="2">Junior</option>
                  <option value="3">Intern</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Close button */}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Add/Edit button */}
        <Button variant="dark" onClick={handleSubmit}>
          {teamToEdit ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the TeamForm component
export default TeamForm;
