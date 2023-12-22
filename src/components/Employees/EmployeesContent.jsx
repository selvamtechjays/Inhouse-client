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
import { Link } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import EmployeeForm from "./EmpolyeeForm";
import { capitalize } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";
import { addTeam, deleteEmployee, getallEmployees, updateEmployee } from "../../service/allapi";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "./Employee.css";

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
  //define a function to call api
  const getAllEmployee = async () => {
    const response = await getallEmployees(employees);
    setEmployees(response.data);
  };

  // handle add and edit employee
  const handleAddEmployee = async (newEmployee, isEdit) => {
    // Capitalize name and role
    newEmployee.name = capitalize(newEmployee.name);
    newEmployee.role = capitalize(newEmployee.role);
  
    // Check if email includes 'techjays' or not
    const atIndex = newEmployee.slack.indexOf("@");
    const domain = newEmployee.slack.slice(atIndex + 1);
    const isTechjaysBeforeAt = domain.includes("techjays");
  
    try {
      if (!isTechjaysBeforeAt) {
        console.log("Email must include 'techjays' before @");
        // Set an error and keep the form open
        setErrors({ ...errors, slack: "Email must include 'techjays' before @" });
        return;
      }
  
      // Exclude isOnline if it's not in the schema
      if (!newEmployee.hasOwnProperty("isOnline")) {
        delete newEmployee.isOnline;
      }
  
      // If editing, update the employee in the list
      if (isEdit) {
        try {
          const response = await updateEmployee(newEmployee._id, newEmployee);
          console.log("Update Response:", response);
  
          if (response.status === 200) {
            // Update the employee
            setEmployees((prevEmployees) =>
              prevEmployees.map((employee) =>
                employee._id === newEmployee._id ? newEmployee : employee
              )
            );
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        } catch (updateError) {
          console.error("Error updating employee", updateError);
          toast.error("Error updating employee. Please try again.");
        }
      } else {
        // if adding new, make an API call to add the employee
        const response = await addTeam(newEmployee);
        console.log("Add Team Response:", response);
  
        if (response.status === 200) {
          // Add the new employee to the state with the returned id
          setEmployees((prevEmployees) => [
            ...prevEmployees,
            { ...newEmployee, id: response.data.id },
          ]);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error updating/adding employee", error);
      toast.error("Error updating/adding employee. Please try again.");
    }
  };
  


  //function for delete Project
  const handleDeleteEmployee = async (id) => {
    //api call for delete Projct
    const response = await deleteEmployee(id);
    if (response.status == 200) {
      toast.success(response.data.message);
      getAllEmployee();
    } else {
      toast.error(response.data.message);
    }
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
        <Row className="mb-2 justify-content-start">
          <Col md="auto" className="text-start">
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
      <MDBTable responsive>
        <thead className="tp">
          <tr>
            <th
              style={{
                backgroundColor: "#500933",
                color: "white",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
              className="p-4"
            >
              Name{" "}
            </th>
            <th
              style={{ backgroundColor: "#500933", color: "white" }}
              className="p-4"
            >
              Role
            </th>
            <th
              style={{ backgroundColor: "#500933", color: "white" }}
              className="p-4"
            >
              Emp code
            </th>
            <th
              style={{ backgroundColor: "#500933", color: "white" }}
              className="p-4"
            >
              Email
            </th>
            <th
              style={{
                backgroundColor: "#500933",
                color: "white",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              className="p-4"
            >
              Actions
            </th>
          </tr>
        </thead>
        <MDBTableBody>
          {employees
            .filter((item) => {
              const searchTerm = search.toLowerCase();
              const employeeValue = item[filterType].toLowerCase();
              return employeeValue.includes(searchTerm);
            })
            .map((employee, index) => (
              <tr key={index}>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "8px" }}>
                    {employee.slack === localStorage.getItem("email") ? (
                      <span style={{ color: "rgba(145, 240, 145, 1)" }}>●</span>
                    ) : (
                      <span style={{ color: "gray" }}>●</span>
                    )}
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    {employee.name}
                  </div>
                </td>
                <td>{employee.role}</td>
                <td>{employee.employeeCode}</td>
                <td>{employee.slack}</td>
                <td>
                  <Link>
                    <a>
                      <BsPencilSquare
                        onClick={() => openForm(employee)}
                        className="ms-1 icon"
                      />
                    </a>
                  </Link>{" "}
                  <a>
                    <BsFillTrash3Fill
                      onClick={() => handleDeleteEmployee(employee._id)}
                      className="ms-2 icon"
                    />
                  </a>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
      <EmployeeForm
        show={isFormOpen}
        handleClose={closeForm}
        handleAddEmployee={handleAddEmployee}
        employeeToEdit={employeeToEdit}
      />
      <ToastContainer position="top-center" />
    </Container>
  );
};
