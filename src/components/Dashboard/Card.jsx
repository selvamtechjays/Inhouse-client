import React, { useState } from 'react';
import { FaFontAwesome } from 'react-icons/fa';
import "./Dashboard.css"
import { getallProjects } from '../../service/allapi';

export function Card({ data }) {
    const [projects, setProjects] = useState([])

     // Function to call the API and get all projects
     const getAllProjects = async () => {
        const response = await getallProjects(projects)
        setProjects(response.data)
        console.log(projects);
    }
    let total = projects.map(a => a.projectName);
    console.log(total)
    getAllProjects()

   
    return (
        <div className="col-xl-3 col-md-6 mb-4 " >
            <div className={`card border-left-${data.colors} shadow h-100 py-2 style-c`}>
                <div className="card-body" >
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className={`text-xs font-weight-bold text-${data.colors} text-uppercase mb-1`}>
                                {data.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{data.count}</div>
                        </div>
                        <div className="col-auto">
                            {data.icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
