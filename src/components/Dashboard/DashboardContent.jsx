import React from 'react'
import {BsJustify}from 'react-icons/bs'

export const DashboardContent = ({OpenSidebar}) => {
  

  return (
    <div>DashboardContent 
         <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
    </div>
  )
}
