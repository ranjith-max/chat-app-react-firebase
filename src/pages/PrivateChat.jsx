import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import './Privatchat.css'

function PrivateChat() {
  let { roomId } = useParams();
  let { user } = useContext(AuthContext);

  let [messages, setMessages] = useState([]);
  let [text, setText] = useState("");
  let scrollRef = useRef(null);


  useEffect(() => {
    let msgRef = collection(db, "private_chats", roomId, "messages");
    let q = query(msgRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(list);

      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 50);
    });

    return () => unsub();
  }, [roomId]);

 
  let sendMessages = async () => {
    if (text.trim() === "") return;

    try {
      await addDoc(collection(db, "private_chats", roomId, "messages"), {
        text,
        userId: user.uid,
        userName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setText("");
    } catch (err) {
      console.log("error on sending private messages", err);
    }
  };

  return (
    <div className="private-chat-container">
      <h3 className="room-title">Private Chat</h3>

      <div className="private-messages" ref={scrollRef}>
        {messages.map((msg) => {
          let isMine = msg.userId === user.uid;

          return (
            <div
              key={msg.id}
              className={`chat-row ${isMine ? "mine" : "theirs"}`}
            >
              {!isMine && (
                <img
                  src={msg.photoURL}
                  className="chat-avatar"
                  alt="profile"
                />
              )}

              <div className="chat-bubble">
                <div className="chat-user-name">{msg.userName}</div>
                <div className="chat-text">{msg.text}</div>

                <div className="chat-time">
                  {msg.createdAt?.toDate
                    ? msg.createdAt.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="private-input">
        <input
          type="text"
          placeholder="type a message.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendMessages}>Send</button>
      </div>
    </div>
  );
}

export default PrivateChat;
