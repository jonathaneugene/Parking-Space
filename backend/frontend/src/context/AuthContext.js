import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';
import axios from "axios";

const AuthContext = React.createContext({});

export function useAuth(){
    return useContext(AuthContext)
}

function AuthProvider({children}){

    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);


    function register(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(()=>{
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsuscribe
    }, [])

    const value = {
        currentUser,
        register,
        login,
        logout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;