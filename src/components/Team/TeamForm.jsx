// TeamForm.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialTeamState = {
  name: "",
  employeeCode: "",
  techStack: "",
  project: "",
  percentage: "",
  priority: "",
};

const TeamForm = ({ show, handleClose, handleAddTeam, teamToEdit }) => {
  const [teamData, setTeamData] = useState(initialTeamState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (teamToEdit) {
      setTeamData(teamToEdit);
    } else {
      setTeamData(initialTeamState);
    }
  }, [teamToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate each field as the user types
    let errorMessage = "";
    switch (name) {
      case "name":
        errorMessage = value.trim() === "" ? "Name is required" : !/^[a-zA-Z\s]+$/.test(value) ? "Name must be a string without numeric characters" : "";
        break;
      case "employeeCode":
        errorMessage = value.trim() === "" ? "Employee Code is required" : !/^\d+$/.test(value) ? "Employee Code must contain only numerical values" : "";
        break;
      case "techStack":
        errorMessage = value.trim() === "" ? "Tech Stack is required" : "";
        break;
      case "project":
        errorMessage = value.trim() === "" ? "Project is required" : "";
        break;
      case "percentage":
        errorMessage = value === "" ? "Allocated Percentage is required" : isNaN(value) || +value < 0 || +value > 100 ? "Please enter a valid percentage (0-100)" : "";
        break;
      case "priority":
        errorMessage = value.trim() === "" ? "Priority is required" : isNaN(value) || +value < 1 ? "Please enter a valid priority (greater than 0)" : "";
        break;
      default:
        errorMessage = "";
    }

    setTeamData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    Object.keys(teamData).forEach((name) => {
      switch (name) {
        case "name":
          newErrors.name = teamData.name.trim() === "" ? "Name is required" : !/^[a-zA-Z\s]+$/.test(teamData.name) ? "Name must be a string without numeric characters" : "";
          break;
        case "employeeCode":
          newErrors.employeeCode = teamData.employeeCode === "" ? "Employee Code is required" : !/^\d+$/.test(teamData.employeeCode) ? "Employee Code must contain only numerical values" : "";
          break;
        case "techStack":
          newErrors.techStack = teamData.techStack.trim() === "" ? "Tech Stack is required" : "";
          break;
        case "project":
          newErrors.project = teamData.project.trim() === "" ? "Project is required" : "";
          break;
        case "percentage":
          newErrors.percentage = teamData.percentage === "" ? "Allocated Percentage is required" : isNaN(teamData.percentage) || +teamData.percentage < 0 || +teamData.percentage > 100 ? "Please enter a valid percentage (0-100)" : "";
          break;
        case "priority":
          newErrors.priority = teamData.priority.trim() === "" ? "Priority is required" : "";
          break;
        default:
          newErrors[name] = "";
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddTeam(teamData, !!teamToEdit);
      setTeamData(initialTeamState);
      handleClose();
    }
  };

  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h2>{teamToEdit ? "Edit Tracker" : "Add Tracker"} </h2></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
              <Form.Group controlId="employeeCode">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee code"
                  name="employeeCode"
                  value={teamData.employeeCode}
                  onChange={handleChange}
                  isInvalid={!!errors.employeeCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.employeeCode}
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
                  <option value="mern">Mern</option>
                  <option value="python">Python</option>
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
              <Form.Group controlId="percentage">
                <Form.Label>Allocated Percentage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter allocated percentage"
                  name="percentage"
                  value={teamData.percentage}
                  onChange={handleChange}
                  isInvalid={!!errors.percentage}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.percentage}
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
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="low">Low</option>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSubmit}>
          {teamToEdit ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamForm;


