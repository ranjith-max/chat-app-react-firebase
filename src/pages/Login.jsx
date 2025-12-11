import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth,provider} from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import './Login.css'


function Login() {
let navigate = useNavigate();
let [loading,setLoading] = useState(false);

let handlelogin = async()=>{
    setLoading(true)
try{
  await signInWithPopup(auth,provider);
  navigate("/")
}
catch(error){
  console.log(error);
  alert("Login Failed")
  
}
setLoading(false);
}

  return (
    <div className='login-page' >
      <h1 className='login-tittle' >Welcome to ChatApp</h1>
      <button className={`signin-btn${loading ? 'loading':''}`} disabled={loading} onClick={handlelogin} >
      {loading ? 'signing in...' :'sign in with google'}
      {loading && <span className='loading-spinner'></span>}
      </button>
    </div>
  )
}

export default Login