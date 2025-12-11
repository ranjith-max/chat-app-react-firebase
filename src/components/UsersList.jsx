import React from 'react'
import { useInsertionEffect, useState, useContext, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function getRoomId(uid1,uid2){
    return uid1< uid2 ? `${uid1}_${uid2}`: `${uid2}_${uid1}`;
}  


function UsersList() {

    let { user } = useContext(AuthContext);
    let [users, setUsers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        let unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            let list = snapshot.docs.map((doc) => doc.data());
            list = list.filter((u) => u.uid !== user.uid);
            setUsers(list);
        })
        return () => unsub()
    }, [user])
    return (
        <div className="users-list">
            <h3>Private Users</h3>

            {users.map((u) => {
                const roomId = getRoomId(user.uid, u.uid);

                return (
                    <div
                        key={u.uid}
                        className="user-item"
                        onClick={() => navigate(`/private/${roomId}`)}
                    >
                        <img
                            src={u.photoURL || "https://www.gravatar.com/avatar/?d=mp&s=64"}
                            className="user-avatar"
                            alt={u.name}
                        />
                        <span>{u.name}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default UsersList