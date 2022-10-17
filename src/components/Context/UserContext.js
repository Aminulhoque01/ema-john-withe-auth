import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.config';


export const AuthContext= createContext();
const auth= getAuth(app)

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);

   const createUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
   }

   const SingIn=(email, password)=>{
        setLoading(true)
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password );
        
   }

   const logOut=()=>{
    return signOut(auth);
   }

   useEffect(()=>{
        const unSubscribe = onAuthStateChanged( auth, currentUser=>{
            console.log('current User inside state Change', currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unSubscribe();
        } 
   },[])


    const authInfo={user, loading, createUser, SingIn, logOut};
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;