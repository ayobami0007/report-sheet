import React, { useState}  from 'react'
import {  NavLink } from 'react-router-dom'
import SideBarLink from './common/SideBarLink'
import { CalculatorIcon, AcademicCapIcon } from '@heroicons/react/16/solid'


const SideBar = () => {
    const [open, setOpen] = useState(false) 
    const handleClose = () => setOpen(false)
  return (
    <div className=" bg-blue-800 text-white p-4 print:hidden">

       <div className="flex justify-between items-center">
      <h1 className='text-2xl font-bold  md:text-3xl'>Teachers Portal</h1>
      <button onClick={() => setOpen(!open)} className='md:hidden'>
         {open ? "✖" : "☰"}
        </button>

         <nav className="hidden md:flex gap-4">
          <SideBarLink to="/report" icon={CalculatorIcon} label="Report">
          <NavLink to="sec-Report">Secondary Report</NavLink>
          <NavLink to="basic-Report"> Basic Report</NavLink>
          </SideBarLink>
          <SideBarLink to="/exam" icon={AcademicCapIcon} label="ExamQuestion">
           <NavLink to="sec-Paper">Secondary Paper</NavLink>
          <NavLink to="basic-Paper"> Basic Paper</NavLink>
          <NavLink to="hand-Writing">Hand Writing</NavLink>
          </SideBarLink>
        </nav>
    </div>
     <div className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${ open ? "max-h-40 opacity-100" : "max-h-0 opacity-0" }`} >
       <nav className='flex  flex-col items-center justify-center gap-2 md:hidden'>
       <SideBarLink to="/report" icon={CalculatorIcon} label="Report" >
       <NavLink to="sec-Report" onClick={handleClose}>Secondary Report</NavLink>
          <NavLink to="basic-Report" onClick={handleClose}> Basic Report</NavLink>
       </SideBarLink>
       <SideBarLink to="/exam" icon={AcademicCapIcon} label="ExamQuestion" >
         <NavLink to="sec-Paper" onClick={handleClose}>Secondary Paper</NavLink>
          <NavLink to="basic-Paper" onClick={handleClose}> Basic Paper</NavLink>
            <NavLink to="hand-Writing" onClick={handleClose}>Hand Writing</NavLink>
       </SideBarLink>
       </nav>
       </div>
    </div>

  )
}

export default SideBar