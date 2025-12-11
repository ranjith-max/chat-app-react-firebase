import React from 'react'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'
import './Message.css'


function Message({message}) {
  let {user} = useContext(AuthContext);
  let isMine = message.userId === user?.uid;

  return (
    <div className={`message-row ${isMine ? "mine":"theirs"}`}>
      {!isMine &&(
        <img src={message.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=64" } 
        alt='user avatar' className='message-avatar'  />
      )}
        <div className='message-bubble'>
          <div className='message-user'>{message.userName}</div>
          <div className='message-text'>{message.text}</div>
          <div className='message-time'>
            {message.createdAt?.toDate ? message.createdAt.toDate().toLocaleTimeString([],{
              hour:"2-digit",
              minute:"2-digit",
            })
            :""}
          </div>
        </div>
    </div>
  )
}

export default Message