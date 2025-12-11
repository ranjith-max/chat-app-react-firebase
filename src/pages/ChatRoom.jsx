import React from 'react'
import { useContext } from 'react'
import Navbar from '../components/Navbar'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import { AuthContext } from "../context/AuthContext";
import './ChatRoom.css'

function ChatRoom() {
  
  return (
   <div className='chatroom'>
   <Navbar/>
      <MessageList/>

      <MessageInput/>
   </div>
  )
}

export default ChatRoom;