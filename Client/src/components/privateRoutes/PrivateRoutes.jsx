import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'

function PrivateRoutes() {
    return (
        <div>
            <NavBar />
            <div className='flex gap-2'>
                <SideBar />
                <div className='flex-grow'>
                    <Outlet />

                </div>

            </div>
        </div>
    )
}

export default PrivateRoutes