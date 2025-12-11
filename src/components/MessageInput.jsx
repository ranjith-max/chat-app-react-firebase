import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import { addDoc,collection,serverTimestamp } from 'firebase/firestore'
import './MessageInput.css'

function MessageInput() {
  let [text,setText] = useState("");
  let {user} = useContext(AuthContext);

    let sentMessage = async()=>{
      if(text.trim()==="")
        return;
      try{
        await addDoc(collection(db,"public_messages"),{
          text,
          userId:user.uid,
          userName:user.displayName,
          photoURL:user.photoURL,
          createdAt:serverTimestamp(),
        })
        setText("");
      }
      catch(error){
          console.log("Message send error",error);         
      }
    }
  return (
    <div className='message-input-container' >
      <input type="text" placeholder='Type a message...' value={text} onChange={(e)=>setText(e.target.value)} />
      <button onClick={sentMessage} >Send</button>
       
    </div>
  )
}

export default MessageInput