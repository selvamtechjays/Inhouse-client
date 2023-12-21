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
import "./project.css";
import { Link } from 'react-router-dom';
import { CiFilter } from "react-icons/ci";
import ProjectForm from "./ProjectForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BsPencilSquare,BsFillTrash3Fill} from 'react-icons/bs'
import { deleteProject, getallProjects } from "../../service/allapi";

// ProjectsContent component definition
export const ProjectsContent = () => {
  // State management for form visibility, projects data, and editing project
  const [isFormOpen, setFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('projectName'); 
  const [filterText, setFilterText] = useState('Filter'); 

  // Function to open the project form
  const openForm = (project) => {
    setProjectToEdit(project);
    setFormOpen(true);
  };

  // Function to close the project form
  const closeForm = () => {
    setProjectToEdit(null);
    setFormOpen(false);
  };

  // Function to call the API and get all projects
  const getAllProjects=async()=>{
    const response=await getallProjects(projects)
    setProjects(response.data)
    console.log(projects);
  }

  // Function to handle adding or editing a project
  const handleAddProject = (newProject, isEdit) => {
    // Capitalize the first letter of projectName, clientName, projectType, and resources
    newProject.projectName = capitalizeFirstLetter(newProject.projectName);
    newProject.clientName = capitalizeFirstLetter(newProject.clientName);
    newProject.projectType = capitalizeFirstLetter(newProject.projectType);
    newProject.resources = capitalizeFirstLetter(newProject.resources);

    // Format startDate and endDate as "dd/mm/yyyy"
    newProject.startDate = formatDate(newProject.startDate);
    newProject.endDate = formatDate(newProject.endDate);

    // Update projects array based on whether it's an edit or addition
    if (isEdit) {
      const updatedProjects = projects.map((project) =>
        project.id === projectToEdit.id ? newProject : project
      );
      setProjects(updatedProjects);
    } else {
      setProjects((prevProjects) => [
        ...prevProjects,
        { ...newProject, id: Date.now() },
      ]);
    }
  };

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //function for delete Project
  const handleDeleteProject = async(id) => {

    //api call for delete Projct
    const response = await deleteProject(id)
    if (response.status == 200) {
      toast.success(response.data.message);
      getAllProjects()
    
    }else{
     
      toast.error(response.data.message);
    }
  }
  // Function to handle filter type selection
  const handleFilterSelect = (type, text) => {
    setFilterType(type);
    setFilterText(text);
  };


  // useEffect hook to fetch all projects on component mount
  useEffect(() => {
    getAllProjects();
  }, []);

  // JSX rendering
  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-start">
          <h1 className="mb-4">Projects</h1>
        </Col>
        <Col className="text-end">
          <Button variant="dark" onClick={() => openForm(null)} style={{ fontSize: "17px", width: "150px" }}>
            Add Project
          </Button>
        </Col>
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
                <Dropdown.Item onClick={() => handleFilterSelect('projectName', 'Project Name')}>Project Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect('clientName', 'Client Name')}>Client Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect('startDate', 'Start Date')}>Start Date</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect('endDate', 'End Date')}>End Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md="auto" className="text-start ">
            <Form.Control onChange={(e) => setSearch(e.target.value)} type="text" placeholder="🔍Search..." style={{ width: "200px" }} />
          </Col>
        </Row>
      </Row>
      <MDBTable responsive>
      <thead className="tp" >
      <tr   >
        <th style={{backgroundColor:"#500933", color:"white",
        borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px"}} className="p-4" >Project Nmae </th>
        <th style={{backgroundColor:"#4c0c32", color:"white",}}  className="p-4" >Client Name</th>
        <th style={{backgroundColor:"#4c0c32", color:"white"}}  className="p-4" >Start Date</th>
        <th style={{backgroundColor:"#4c0c32", color:"white"}}  className="p-4" >End Date</th>
        <th style={{backgroundColor:"#4c0c32", color:"white"}}  className="p-4" >Proj.Type</th>
        <th style={{backgroundColor:"#4c0c32", color:"white"}}  className="p-4" >#Resources</th>
        <th style={{backgroundColor:"#4c0c32", color:"white",
        borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}  className="p-4" >Actions</th>
      
      </tr>
     </thead>
      <MDBTableBody>
          {projects.filter((item) => {
            const searchTerm = search.toLowerCase();
            const projectValue = item[filterType].toLowerCase();
            return projectValue.includes(searchTerm);
          }).map((project, index) => (
            <tr>
              <td>{project.projectName}</td>
              <td>{project.clientName}</td>
              <td>{moment(project.startDate).format("DD-MM-YYYY")}</td>
              <td>{moment(project.endDate).format("DD-MM-YYYY")}</td>
              <td>{project.projectType}</td>
              <td>{project.resources}</td>
      
              <td><Link><a><BsPencilSquare onClick={() => openForm(project)} className=' ms-1 icon'/></a>
              </Link> <a><BsFillTrash3Fill onClick={() => handleDeleteProject(project._id)} className='ms-2 icon'/></a></td>
      
           
            </tr>
            ))}
       </MDBTableBody>
    </MDBTable>
      <ProjectForm show={isFormOpen} handleClose={closeForm} handleAddProject={handleAddProject} projectToEdit={projectToEdit} />
      <ToastContainer position="top-center" />
    </Container>
  );
};