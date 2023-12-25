// TeamContent.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Table, Dropdown, Form } from "react-bootstrap";
import TeamForm from "./TeamForm";
import { CiFilter } from "react-icons/ci";
import { capitalize } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BsPencilSquare,BsFillTrash3Fill,BsJustify} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { deleteTeam } from "../../service/allapi";

export const TeamContent = ({OpenSidebar}) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('name'); 
  const [filterText, setFilterText] = useState('Name'); 

    //for pagenation
    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = teams.slice(firstIndex, lastIndex);
    const npages =Math.ceil(teams.length / recordsPerPage);
    const numbers = [...Array(npages+1).keys()].slice(1)



  const openForm = (team) => {
    setTeamToEdit(team);
    setFormOpen(true);
  };

  const closeForm = () => {
    setTeamToEdit(null);
    setFormOpen(false);
  };

  const handleAddTeam = (newTeam, isEdit) => {
    newTeam.name = capitalize(newTeam.name)
    if (isEdit) {
      const updatedTeams = teams.map((team) => (team.id === teamToEdit.id ? newTeam : team));
      setTeams(updatedTeams);
      setTeamToEdit(null);
      setFormOpen(false);
    } else {
      setTeams((prevTeams) => [...prevTeams, { ...newTeam, id: Date.now() }]);
    }
  };

  const handleDeleteTeam =async(id) => {

    //api call for delete Projct
    const response = await deleteTeam(id)
    if (response.status == 200) {
      toast.success(response.data.message);
      getAllProjects()
    
    }else{
     
      toast.error(response.data.message);
    }
  }

  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
          <h1 className="mb-4">Teams</h1>
        </Col>
        <Col className="text-end">
          <Button variant="dark" onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px"}}>
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
              <CiFilter /> {filterText}
            </Dropdown.Toggle>

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
      <MDBTable responsive>
      <thead className="tp" >
      <tr   >
     
          <th style={{backgroundColor:"#500933", color:"white",
        borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}} className="p-4">Name</th>
          <th style={{backgroundColor:"#500933", color:"white",}} className="p-4">Emp code</th>
          <th style={{backgroundColor:"#500933", color:"white",}} className="p-4">Tech stack</th>
          <th style={{backgroundColor:"#500933", color:"white",}} className="p-4">Project</th>
          <th style={{backgroundColor:"#500933", color:"white",}} className="p-4">Percentage</th>
          <th style={{backgroundColor:"#500933", color:"white",}} className="p-4">Priority</th>
          <th  style={{backgroundColor:"#500933", color:"white",
        borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}  className="p-4">Action</th>
          </tr>
     </thead>
      <MDBTableBody>
     
          {records
            .filter((team) => {
              const searchTerm = search.toLowerCase();
              const teamValue = team[filterType].toLowerCase();
              return teamValue.includes(searchTerm);
            })
            .map((team, index) => (
              <tr>

                <td className="table-cell">{team.name}</td>
                <td className="table-cell">{team.empCode}</td>
                <td className="table-cell">{team.techStack}</td>
                <td className="table-cell">{team.project}</td>
                <td className="table-cell">{team.allocatedPercentage}</td>
                <td className="table-cell">{team.priority}</td>
           
                <td><Link><a><BsPencilSquare onClick={() => openForm(team)} className=' ms-1 icon'/></a>
              </Link> <a><BsFillTrash3Fill onClick={() => handleDeleteTeam(team._id)} className='ms-2 icon'/></a></td>
      
           
            </tr>
            ))}
       </MDBTableBody>
    </MDBTable>
    <nav className=' fs-5 p-4 ' >
    <ul className='pagination  '>
    
      {
        numbers.map((n, i)=>(
          <li className={`page-item ${currentPage === n ? 'active' : ''}`}key={i}>
            <a className='page-link text-dark' style={{backgroundColor:"white"}} onClick={()=>changeCpage(n)}>{n}</a>
          </li>

        ))
      }
   
    </ul>
  </nav>
      <TeamForm show={isFormOpen} handleClose={closeForm} handleAddTeam={handleAddTeam} teamToEdit={teamToEdit} />
      <ToastContainer position="top-center" />
    </Container>
  );
  //for pagenation

  function changeCpage(id){
    setCurrentPage(id)

  }
};

export default TeamContent