// TeamContent.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Dropdown, Form } from "react-bootstrap";
import TeamForm from "./TeamForm";
import { CiFilter } from "react-icons/ci";
import { capitalize } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BsPencilSquare,BsFillTrash3Fill,BsJustify,BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { addTracker, deleteTracker, getallTracker, updateTracker } from "../../service/allapi";
import { MdOutlineFilterAlt } from "react-icons/md";

export const TeamContent = ({OpenSidebar}) => {

//for delete confirm modal
  const [smShow, setSmShow] = useState(false);

  const [isFormOpen, setFormOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('name'); 
  const [filterText, setFilterText] = useState('Filter'); 

    //for pagenation
    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 8;
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

    // Function to call the API and get all projects
    const getallTeam=async()=>{
      const response=await getallTracker(teams)
      console.log(response.data);
      setTeams(response.data)

    }


// add tracker
const handleAddTeam = async (newTeam, isEdit) => {
  // Capitalize name 
  newTeam.name = capitalize(newTeam.name);

  try {
    // If editing, update the team in the list
    if (isEdit) {
      try {
        const response = await updateTracker(newTeam._id, newTeam);
        console.log("Update Response:", response);

        if (response.status === 200) {
          // Update the team
          setTeams((prevTeams) =>
            prevTeams.map((team) => (team._id === newTeam._id ? newTeam : team))
          );

          // Check if response.data is defined before accessing its properties
          if (response.data && response.data.message) {
            toast.success(response.data.message);
          } else {
            toast.error("Unexpected response format during update.");
          }
        } else {
          toast.error(response.data.message || "Error updating Tracker. Please try again.");
        }
      } catch (updateError) {
        console.error("Error updating Tracker", updateError);
        toast.error("Error updating Tracker. Please try again.");
      }
    } else {
      // If adding new, make an API call to add the team
      const response = await addTracker(newTeam);
      console.log("Add Team Response:", response);

      // Check if response.data is defined before accessing its properties
      if (response.data && response.data.message) {
        if (response.status === 201) {
          // Add the new team to the state with the returned id
          setTeams((prevTeams) => [
            ...prevTeams,
            { ...newTeam, id: response.data.id },
          ]);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Unexpected response format during team addition.");
      }
    }
  } catch (error) {
    console.error("Error updating/adding Team", error);
    toast.error("You are adding the same empCode, kindly check that.");
  }
};

    

  const handleDeleteTeam =async(id) => {

    //api call for delete Projct
    const response = await deleteTracker(id)
    if (response.status == 200) {
      toast.success(response.data.message);
      setSmShow(false)
      getallTeam()
    
    }else{
     
      toast.error(response.data.error);
    }
  }

  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };
    // useEffect hook to fetch all employees on component mount
    useEffect(() => {
      getallTeam()
    }, []);

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
          <h1 className="mb-2">Teams</h1>
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
           style={{
            fontSize: "16px",
            padding:"7px",
            backgroundColor: "#f5f0f0",
            color: "rgb(50, 49, 49)",
            border:"none",
            fontWeight:"normal"
              }} 
              id="dropdown-basic"
            >
             <MdOutlineFilterAlt id="filter-icon"  /> {filterText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterSelect('name', 'Name')}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('employeeCode', 'Emp code')}>Emp code</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('techStack', 'Tech stack')}>Tech stack</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('project', 'Project')}>Project</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('percentage', 'Percentage')}>Percentage</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterSelect('priority', 'Priority')}>Priority</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="auto" className="text-start ">
          <div className="input-wrapper">
        <IoSearchSharp id="search-icon" />
        <input 
          type="text" 
          placeholder="Search"
          style={{ width: "200px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}

          /> 
          </div>
          </Col>
      </Row>
      <MDBTable responsive className="mt-3">
      <thead className="tp" >
      <tr   >
     
          <th style={{backgroundColor:"#450c36", color:"white",
        borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}} className="p-4">Name</th>
          <th style={{backgroundColor:"#450c36", color:"white",}} className="p-4">Emp code</th>
          <th style={{backgroundColor:"#450c36", color:"white",}} className="p-4">Tech stack</th>
          <th style={{backgroundColor:"#450c36", color:"white",}} className="p-4">Project</th>
          <th style={{backgroundColor:"#450c36", color:"white",}} className="p-4">Percentage</th>
          <th style={{backgroundColor:"#450c36", color:"white",}} className="p-4">Priority</th>
          <th  style={{backgroundColor:"#450c36", color:"white",
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
                <td className="table-cell">{team.employeeCode}</td>
                <td className="table-cell">{team.techStack}</td>
                <td className="table-cell">{team.project}</td>
                <td className="table-cell">{team.percentage} %</td>
                <td className="table-cell">{team.priority}</td>
           
                <td><Link><a style={{color:"#450c36"}}><BsPencilSquare onClick={() => openForm(team)} className=' ms-1 icon'/></a>
              </Link> <a style={{color:"#450c36"}}><BsFillTrash3Fill onClick={() => setSmShow(true)} className='ms-2 icon'/></a>
              <Modal 
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body ><h5 className="text-center" style={{marginTop:'-40px'}}>Are u want to Delete ?</h5></Modal.Body>
        <Modal.Footer style={{marginTop:'-25px'}} >
          <Button variant="secondary" style={{ borderRadius: '10px',
          color:"white",marginLeft:"-50px"}} onClick={() => setSmShow(false)}>Close</Button>
          <Button variant="dark" style={{ borderRadius: '10px',
          color:"white"}}  onClick={() => handleDeleteTeam(team._id) }>Confirm</Button>
        </Modal.Footer>
      </Modal>
</td>
      
           
            </tr>
            ))}
       </MDBTableBody>
    </MDBTable>
    <nav className=' fs-5 p-4 ' >
    <ul className='pagination  '>
    
      {
        numbers.map((n, i)=>(
          <li className={`page-item ${currentPage === n ? 'active' : ''}`}key={i}>
            <a className='page-link '  onClick={()=>changeCpage(n)}>{n}</a>
          </li>

        ))
      }
   
    </ul>
  </nav>
      <TeamForm show={isFormOpen} handleClose={closeForm} handleAddTeam={handleAddTeam} teamToEdit={teamToEdit} />
      <ToastContainer autoClose={500}   position="top-center" />
    </Container>
  );
  //for pagenation

  function changeCpage(id){
    setCurrentPage(id)

  }
};

export default TeamContent