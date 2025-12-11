import React, { useContext } from 'react'
import Login from './pages/Login'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import ChatRoom from './pages/ChatRoom'
import { AuthContext } from './context/AuthContext'
import PrivateChat from './pages/PrivateChat'
import PrivateLayout from './pages/PrivateLayout'
import EmptyChat from './components/EmptyChat'
import './index.css'
import "./App.css";
  

function PrivateRoutes({children}){
  let {user,loading} = useContext(AuthContext);
   if (loading) return <h2>Loading...</h2>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
function App() {
  
  return (
    
      
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/' element ={<PrivateRoutes><ChatRoom/></PrivateRoutes>}/>
        <Route path='/private' element = {<PrivateRoutes><PrivateLayout/></PrivateRoutes>}>
        <Route index element={<EmptyChat/>}/>
        <Route path=':roomId' element = {<PrivateChat/>}/>
        </Route>
      </Routes>
  )
}

export default App