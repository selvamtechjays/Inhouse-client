// TeamContent.js

// Import necessary React components and hooks
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown, Form } from "react-bootstrap";
import TeamForm from "./TeamForm"; // Import the TeamForm component
import { CiFilter } from "react-icons/ci"; // Import the CiFilter icon
import { capitalize } from "@mui/material"; // Import the capitalize function from Material-UI

// Functional component for managing team-related content
export const TeamContent = () => {
  // State variables for managing the component's state
  const [isFormOpen, setFormOpen] = useState(false); // State for controlling the TeamForm modal
  const [teams, setTeams] = useState([]); // State for storing team data
  const [teamToEdit, setTeamToEdit] = useState(null); // State for storing the team being edited
  const [search, setSearch] = useState(''); // State for storing the search input
  const [filterType, setFilterType] = useState('name'); // State for storing the filter type
  const [filterText, setFilterText] = useState('Name'); // State for storing the filter text

  // Effect hook to load teams from local storage on component mount
  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
    setTeams(storedTeams);
  }, []);

  // Effect hook to update local storage when teams state changes
  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  // Function to open the TeamForm modal for adding/editing a team
  const openForm = (team) => {
    setTeamToEdit(team);
    setFormOpen(true);
  };

  // Function to close the TeamForm modal
  const closeForm = () => {
    setTeamToEdit(null);
    setFormOpen(false);
  };

  // Function to add or edit a team based on the form data
  const handleAddTeam = (newTeam, isEdit) => {
    // Capitalize the name field
    newTeam.name = capitalize(newTeam.name)
    
    // Check if it's an edit operation
    if (isEdit) {
      // Update the team in the teams array
      const updatedTeams = teams.map((team) => (team.id === teamToEdit.id ? newTeam : team));
      setTeams(updatedTeams);
      setTeamToEdit(null);
      setFormOpen(false);
    } else {
      // Add a new team to the teams array
      setTeams((prevTeams) => [...prevTeams, { ...newTeam, id: Date.now() }]);
    }
  };

  // Function to delete a team based on its index
  const handleDeleteTeam = (index) => {
    const updatedTeams = [...teams];
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  // Function to handle the selection of a filter type
  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };

  // Render the TeamContent component
  return (
    <Container>
      {/* Row for the main header */}
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Teams</h1>
        </Col>
        <Col className="text-end">
          {/* Button to open the TeamForm for adding a new team */}
          <Button variant="dark" onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px"}}>
            Add Team
          </Button>
        </Col>
      </Row>

      {/* Row for filter options and search input */}
      <Row className="mb-2 justify-content-start">
        {/* Dropdown for selecting filter type */}
        <Col md="auto" className="text-start">
          <Dropdown>
            <Dropdown.Toggle
              style={{ fontSize: "15px", backgroundColor: "rgb(201, 192, 192)", color: "black" }}
              id="dropdown-basic"
            >
              <CiFilter /> {filterText}
            </Dropdown.Toggle>

            {/* Dropdown menu with filter options */}
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterSelect('name', 'Name')}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('empCode', 'Emp code')}>Emp code</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('techStack', 'Tech stack')}>Tech stack</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('project', 'Project')}>Project</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('allocatedPercentage', 'Percentage')}>Percentage</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('priority', 'Priority')}>Priority</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Input for search */}
        <Col md="auto" className="text-start ">
          <Form.Control
            type="text"
            placeholder="🔍Search..."
            style={{ width: "200px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* Container for displaying the team table */}
      <div className="table-container">
        {/* Table header */}
        <div className="table-heading">
          <div className="table-cell">Name</div>
          <div className="table-cell">Emp code</div>
          <div className="table-cell">Tech stack</div>
          <div className="table-cell">Project</div>
          <div className="table-cell">Percentage</div>
          <div className="table-cell">Priority</div>
          <div className="table-cell">Action</div>
        </div>

        {/* Table body with team data */}
        <div className="table-body">
          {teams
            .filter((team) => {
              const searchTerm = search.toLowerCase();
              const teamValue = team[filterType].toLowerCase();
              return teamValue.includes(searchTerm);
            })
            .map((team, index) => (
              <div key={index} className="table-row">
                {/* Displaying team information in table cells */}
                <div className="table-cell">{team.name}</div>
                <div className="table-cell">{team.empCode}</div>
                <div className="table-cell">{team.techStack}</div>
                <div className="table-cell">{team.project}</div>
                <div className="table-cell">{team.allocatedPercentage}</div>
                <div className="table-cell">{team.priority}</div>

                {/* Buttons for editing and deleting teams */}
                <div className="table-cell">
                  <Button variant="dark" style={{ fontSize: "12px" }} onClick={() => openForm(team)}>
                    Edit
                  </Button>{" "}
                  <Button variant="secondary" style={{ fontSize: "12px" }} onClick={() => handleDeleteTeam(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* TeamForm component for adding/editing teams */}
      <TeamForm show={isFormOpen} handleClose={closeForm} handleAddTeam={handleAddTeam} teamToEdit={teamToEdit} />
    </Container>
  );
};

// Export the TeamContent component as the default export
export default TeamContent;
