import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import './Navbar.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Navbar() {
  let {user} = useContext(AuthContext);
  let navigate = useNavigate();
  let handleLogOut = async()=>{
    try{
      console.log("signout clicked");
      
      await signOut(auth);
      alert("LogOut Successs")
    }
    catch(error){
      console.log("Logout failed",error);
      
      alert("LogOut Failed")
    }
  }
  return (
   <header className='navbar' >
     <div className='navbar-left' >
   <img src={user?.photoURL ||  "https://www.gravatar.com/avatar/?d=mp&s=64" } alt={user?.displayName || "User" } className='navbar-avatar' />
   <div className='navbar-user-info' >
    <div className='navbar-name' >{user?.displayName || "User"}</div>
   </div>
    </div>
    <div className='navbar-right' >
      <button onClick={()=>navigate('/private')} >Private Chat</button>
      <button onClick={handleLogOut} >LogOut</button>
    </div>
   </header>
  )
}

export default Navbar