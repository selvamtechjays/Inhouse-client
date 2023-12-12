// TeamContent.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Dropdown, Form } from "react-bootstrap";
import TeamForm from "./TeamForm";
import { CiFilter } from "react-icons/ci";


export const TeamContent = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamToEdit, setTeamToEdit] = useState(null);

  useEffect(() => {
    // Load teams from storage or API
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(storedTeams);
  }, []);

  useEffect(() => {
    // Save teams to storage whenever the teams state changes
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const openForm = (team) => {
    setTeamToEdit(team);
    setFormOpen(true);
  };

  const closeForm = () => {
    setTeamToEdit(null);
    setFormOpen(false);
  };

  const handleAddTeam = (newTeam, isEdit) => {
    if (isEdit) {
      // If editing, update the team in the state
      const updatedTeams = teams.map((team) => (team.id === teamToEdit.id ? newTeam : team));
      setTeams(updatedTeams);
    } else {
      // If adding new, add the team to the state with a unique id
      setTeams((prevTeams) => [...prevTeams, { ...newTeam, id: Date.now() }]);
    }
  };

  const handleDeleteTeam = (index) => {
    const updatedTeams = [...teams];
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Teams</h1>
        </Col>
        <Col className="text-end">
          <Button onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px", backgroundColor: "#500933" }}>
            Add Team
          </Button>
        </Col>
      </Row>
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
                <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Role</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Employee Code</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Slack</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto" className="text-start ">
            <Form.Control type="text" placeholder="🔍Search..." style={{ width: "200px" }} />
          </Col>
        </Row>
   <div className="table-container">
      <div className="table-heading">
        <div className="table-cell">Name</div>
        <div className="table-cell">Emp code</div>
        <div className="table-cell">Tech stack</div>
        <div className="table-cell">Project</div>
        <div className="table-cell">Percentage</div>
        <div className="table-cell">Priority</div>
        <div className="table-cell">Action</div>
      </div>
      <div className="table-body">
        {teams.map((team, index) => (
          <div key={index} className="table-row">
            <div className="table-cell">{team.name}</div>
            <div className="table-cell">{team.empCode}</div>
            <div className="table-cell">{team.techStack}</div>
            <div className="table-cell">{team.project}</div>
            <div className="table-cell">{project.percentage}</div>
            
            <div className="table-cell">
              <Button variant="success" style={{ fontSize: "12px" }} onClick={() => openForm(team)}>
                Edit
              </Button>{" "}
              <Button variant="danger" style={{ fontSize: "12px" }} onClick={() => handleDeleteTeam(index)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
      <TeamForm show={isFormOpen} handleClose={closeForm} handleAddTeam={handleAddTeam} teamToEdit={teamToEdit} />
    </Container>
  );
};


