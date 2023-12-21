import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTeam } from "../../service/allapi";

// EmployeeForm component definition
const EmployeeForm = ({ show, handleClose, handleAddEmployee, employeeToEdit }) => {
  // Initial state for employee data
  const initialEmployeeState = {
    name: "",
    role: "",
    employeeCode: "",
    slack: "",
    isOnline: false,
  };

  // State to manage employee data
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  
  // State to manage form validation errors
  const [errors, setErrors] = useState({});
   
  // Navigate function from react-router-dom
  const navigate = useNavigate()

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(employeeData);

  // Event handler for save button click
  const handleSave = async () => {
    // API call to add team member
    const response = await addTeam(employeeData)
    
    // Check the response status
    if (response.status === 200) {
      toast.success(response.data.message);
      
      // Navigate to the profile page after a delay
      setTimeout(() => {
        navigate('/profile')
      }, 1500);
    } else {
      toast.error(response.data.message);
    }

    // Validate the form and set errors
    const validationErrors = validateForm(employeeData);
    setErrors(validationErrors);

    // If there are no validation errors, add/edit the employee, close the modal, and reset the form
    if (Object.keys(validationErrors).length === 0) {
      handleAddEmployee(employeeData, !!employeeToEdit);
      handleClose();
      setEmployeeData(initialEmployeeState);
    }
  };

  // Form validation function
  const validateForm = (data) => {
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.role.trim()) {
      errors.role = "Role is required";
    }

    if (!data.employeeCode.trim()) {
      errors.employeeCode = "Employee Code is required";
    }

    if (!data.slack.trim()) {
      errors.slack = "Email is required (must include 'techjays' before @)";
    }

    return errors;
  };
  
  // JSX rendering
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employeeToEdit ? "Edit Team Member" : "Add Team Member"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              {/* Form group for Name */}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              {/* Form group for Role */}
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter role"
                  name="role"
                  value={employeeData.role}
                  onChange={handleChange}
                  isInvalid={!!errors.role}
                />
                <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Form group for Slack (Email) */}
              <Form.Group controlId="slack">
                <Form.Label>Slack</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Email"
                  name="slack"
                  value={employeeData.slack}
                  onChange={handleChange}
                  isInvalid={!!errors.slack}
                />
                <Form.Control.Feedback type="invalid">{errors.slack}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Form group for Employee Code */}
              <Form.Group controlId="employeeCode">
                <Form.Label>Employee Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee code"
                  name="employeeCode"
                  value={employeeData.employeeCode}
                  onChange={handleChange}
                  isInvalid={!!errors.employeeCode}
                />
                <Form.Control.Feedback type="invalid">{errors.employeeCode}</Form.Control.Feedback>
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
        {/* Save button */}
        <Button variant="dark" onClick={handleSave}>
          {employeeToEdit ? "Edit" : "Add"}
        </Button>
      </Modal.Footer>
      {/* Toast container for notifications */}
      <ToastContainer position="top-center" />
    </Modal>
  );
};

export default EmployeeForm;

