// EmpolyeeForm.jsx

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EmpolyeeForm = ({ show, handleClose, handleAddEmployee, employeeToEdit }) => {
  const initialEmployeeState = {
    name: "",
    role: "",
    employeeCode: "",
    slack: "",
  };

  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setEmployeeData(employeeToEdit);
    } 
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const validationErrors = validateForm(employeeData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handleAddEmployee(employeeData, !!employeeToEdit);
      handleClose();
      setEmployeeData(initialEmployeeState);
    }
  };

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
      errors.slack = "Slack is required";
    }

    return errors;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employeeToEdit ? "Edit Employee" : "Add Employee"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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

          <Form.Group controlId="slack">
            <Form.Label>Slack</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Slack"
              name="slack"
              value={employeeData.slack}
              onChange={handleChange}
              isInvalid={!!errors.slack}
            />
            <Form.Control.Feedback type="invalid">{errors.slack}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmpolyeeForm;

