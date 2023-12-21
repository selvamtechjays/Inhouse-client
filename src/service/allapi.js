import BASE_URL from "./baseurl";
import { commonRequest } from "./commonReq";

//Employee Section

//add employee
export const addTeam=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/add-employee`,body)
}

//get all employees in table
export const getallEmployees=async(body)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-employees`,body)
}
//Get a single Employee
export const getSingleEmployee=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-singleEmp/${id}`,"")
}

//Update An Eployee
export const updateEmployee=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/api/update-employee${id}`,body)
}
//Delete an Employee
export const deleteEmployee=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/api/delete-employee/${id}`,"")
}

//Project section

//add project
export const addProject=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/api/add-project`,body)
}

//get all projects in table
export const getallProjects=async(body)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-projects`,body)
}
//Get a single Project
export const getSingleProject=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/api/get-singleEmp/${id}`,"")
}

//Delete a project
export const deleteProject=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/api/delete-project/${id}`,"")
}





