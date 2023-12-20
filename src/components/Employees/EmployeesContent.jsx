// EmployeeContent.js

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
import { CiFilter } from "react-icons/ci";
import EmployeeForm from "./EmpolyeeForm"; // Importing the EmployeeForm component
import { capitalize } from "@mui/material"; // Importing the capitalize utility function
import { getallEmployees } from "../../service/allapi"; // Importing API functions

// EmployeesContent component definition
export const EmployeesContent = () => {
  // State variables
  const [isFormOpen, setFormOpen] = useState(false); // For controlling the visibility of the employee form
  const [employees, setEmployees] = useState([]); // For storing the list of employees
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // For tracking the employee being edited
  const [search, setSearch] = useState(""); // For storing the search term
  const [filterType, setFilterType] = useState("name"); // Default filter type
  const [filterText, setFilterText] = useState("Filter"); // Default filter text
  const [errors, setErrors] = useState({}); // For handling form validation errors

  // useEffect hook to set online status based on user email
  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    // Find the corresponding employee and set online status
    const updatedEmployees = employees.map((employee) =>
      employee.slack === userEmail ? { ...employee, isOnline: true } : employee
    );
    // TODO: You need to do something with the updatedEmployees, probably set it in state
  }, [employees]); // Re-run the effect when employees state changes

  // Function to open the employee form
  const openForm = (employee) => {
    setEmployeeToEdit(employee);
    setFormOpen(true);
  };

  // Function to close the employee form
  const closeForm = () => {
    setEmployeeToEdit(null);
    setFormOpen(false);
  };

  // Function to fetch all employees
  const getAllEmployee = async () => {
    try {
      const response = await getallEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // useEffect hook to fetch all employees on component mount
  useEffect(() => {
    getAllEmployee();
  }, []);

  // Function to handle adding or editing an employee
  const handleAddEmployee = (newEmployee, isEdit) => {
    // Capitalize name and role
    newEmployee.name = capitalize(newEmployee.name);
    newEmployee.role = capitalize(newEmployee.role);

    // Check if email includes 'techjays' or not
    const atIndex = newEmployee.slack.indexOf("@");
    const domain = newEmployee.slack.slice(atIndex + 1);
    const isTechjaysBeforeAt = domain.includes("techjays");

    if (!isTechjaysBeforeAt) {
      console.log("Email must include 'techjays' before @");
      // Set an error and keep the form open
      setErrors({ ...errors, slack: "Email must include 'techjays' before @" });
      return;
    }

    // If editing, update the employee in the list
    if (isEdit) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === employeeToEdit.id ? newEmployee : employee
      );
      setEmployees(updatedEmployees);
    } else {
      // If adding, add the new employee to the list
      setEmployees((prevEmployees) => [
        ...prevEmployees,
        { ...newEmployee, id: Date.now() },
      ]);
    }
    // Clear errors and close the form after successful submission
    setErrors({});
    setFormOpen(false);
  };

  // Function to handle deleting an employee
  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  // Function to handle selecting a filter type
  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };

  // useEffect hook to fetch all employees on component mount
  useEffect(() => {
    getAllEmployee();
  }, []);

  // JSX rendering
  return (
    <Container>
      {/* Header Section */}
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Employees</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="dark"
            onClick={() => openForm(null)}
            style={{ fontSize: "17px", width: "150px" }}
          >
            Add Employee
          </Button>
        </Col>
        {/* Search and Filter Section */}
        <Row className="mb-2 justify-content-start">
          <Col md="auto" className="text-start">
            {/* Dropdown for selecting filter type */}
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  fontSize: "15px",
                  backgroundColor: "rgb(201, 192, 192)",
                  color: "black",
                }}
                id="dropdown-basic"
              >
                <CiFilter /> {filterText}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleFilterSelect("name", "Name")}
                >
                  Name
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleFilterSelect("role", "Role")}
                >
                  Role
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleFilterSelect("employeeCode", "Employee Code")
                  }
                >
                  Employee Code
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleFilterSelect("slack", "Email")}
                >
                  Email
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto" className="text-start ">
            {/* Search input */}
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="🔍Search..."
              style={{ width: "200px" }}
            />
          </Col>
        </Row>
      </Row>
      {/* Employee Table Section */}
      <div className="table-container">
        {/* Table Header */}
        <div className="table-heading">
          <div className="table-cell">Name</div>
          <div className="table-cell">Role</div>
          <div className="table-cell">Emp code</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Action</div>
        </div>
        {/* Table Body */}
        <div className="table-body">
          {employees
            .filter((item) => {
              const searchTerm = search.toLowerCase();
              const employeeValue = item[filterType].toLowerCase();
              return employeeValue.includes(searchTerm);
            })
            .map((employee, index) => (
              <div key={index} className="table-row">
                {/* Online status indicator */}
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    {employee.slack === localStorage.getItem("email") ? (
                      <span style={{ color: "rgb(145, 240, 145)" }}>●</span>
                    ) : (
                      <span style={{ color: "gray" }}>●</span>
                    )}
                  </div>
                </div>
                {/* Employee data cells */}
                <div className="table-cell">{employee.name}</div>
                <div className="table-cell">{employee.role}</div>
                <div className="table-cell">{employee.employeeCode}</div>
                <div className="table-cell">{employee.slack}</div>
                {/* Action buttons */}
                <div className="table-cell">
                  <Button
                    variant="dark"
                    style={{ fontSize: "12px" }}
                    onClick={() => openForm(employee)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    style={{ fontSize: "12px" }}
                    onClick={() => handleDeleteEmployee(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* EmployeeForm component for adding/editing employees */}
      <EmployeeForm
        show={isFormOpen}
        handleClose={closeForm}
        handleAddEmployee={handleAddEmployee}
        employeeToEdit={employeeToEdit}
      />
    </Container>
  );
};
