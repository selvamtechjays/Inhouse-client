import React from 'react'
import { BarChart } from './BarChart';
import { CardList } from './CardList';
import { PieChart } from './PieChart';
import { BsJustify } from 'react-icons/bs';
import { LineChart } from './LineChart';


export function Dashboard({OpenSidebar}) {
    return (
        <div className="container-fluid p-3">
            <div className='menu-icon'>
            <BsJustify  className='icon' onClick={OpenSidebar}/>
            </div>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800" >Dashboard</h1>
            </div>
            <CardList />
            <div className="row">

                <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Employees and Workdone</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-bar">
                                <BarChart />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xl-4 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Projects priority</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-bar">
                                <PieChart />
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <div className="col-xl-12 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Projects and Deadlines</h6>
                        </div>
                        <div className="card-body">
                            <div className="chart-bar">
                                <LineChart />
                            </div>
                        </div>
                    </div>

                </div>
        </div>
    );
}

export default Dashboard