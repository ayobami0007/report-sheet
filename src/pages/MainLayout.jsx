import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='flex flex-col h-screen  bg-gray-100 '>

        <SideBar/>
        <main id="main-content" className='p-6 w-full bg-gray-100 flex-1 overflow-y-auto'>
            <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout