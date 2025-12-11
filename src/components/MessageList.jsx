import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { db } from '../firebase'
import {collection,query,orderBy,onSnapshot,limit} from "firebase/firestore"
import Message from './Message'
import './MessageList.css'

let AVATAR_FALLBACK = "https://www.gravatar.com/avatar/?d=mp&s=64";


function MessageList() {
  let [messages,setMessage] = useState([]);
  let containerRef = useRef(null);

  useEffect (()=>{
    let q = query(
      collection(db,"public_messages"),
      orderBy("createdAt","asc"),
      limit(200)
    )
    let unsubscribe = onSnapshot(q,(snapshot)=>{
      let docs = snapshot.docs.map((d)=>({id:d.id,...d.data()}));
      setMessage(docs);
    })
    return()=>unsubscribe();
  },[])

  useEffect(()=>{
    let e1 = containerRef.current;
    if(!e1)
      return;
    setTimeout(()=> {
      e1.scrollTop = e1.scrollHeight;
    },50)
  },[messages.length])
  return (
   <div className='message-list' ref={containerRef}>
    {messages.map((m)=>(
      <Message key={m.id} message={m}/>
    ))}
   </div>
  )
}

export default MessageList