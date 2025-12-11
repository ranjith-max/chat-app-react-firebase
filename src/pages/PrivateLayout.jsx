import React from 'react'
import UsersList from '../components/UsersList'
import { Outlet } from 'react-router-dom'


function PrivateLayout() {

  return (
    <div className='private-layotu' >
            <div className='sidebar'>
                <UsersList/>
            </div>
            <div className='chat-area' >
                <Outlet/>
            </div>
    </div>
  )
}

export default PrivateLayout