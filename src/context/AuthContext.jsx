import React, { createContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {doc,setDoc} from 'firebase/firestore';
import { db } from "../firebase";

export const AuthContext = createContext();

  export default function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(()=>{
    if(!user) return;
    let savUser = async()=>{
      await setDoc(doc(db,"users",user.uid),{
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        photoURL:user.photoURL,
      },
      {merge:true}
    )
    }
    savUser();
  },[user])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

