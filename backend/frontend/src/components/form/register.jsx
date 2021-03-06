import React, {useRef, useState} from "react";
import { useAuth } from "../../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function RegisterForm(){

    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {register} = useAuth();
    const[error, setError] =  useState('');
    const[loading, setLoading] =  useState(false);
    const history = useHistory();



    async function handleSubmit(e) {
        e.preventDefault()
        console.log(usernameRef.current.valueOf());
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }
        else if (passwordRef.current.value.toString().length < 6){
            return setError('Password should at-least have 6 characters')
        }
        try {
            setError("");
            setLoading(true);
            await register(usernameRef.current.value, passwordRef.current.value)
            history.push('/personal-info')
        } catch{
            setLoading(false);
            return setError("Failed to create an account")
        }

    }

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <div>
                <h6 className="labels">EMAIL ID:</h6>
                <input type={"email"} name={"email"} ref={usernameRef}/>
            </div>
            <div>
                <h6 className="labels">PASSWORD:</h6>
                <input type={"password"} ref={passwordRef}/>
            </div>
            <div>
                <h6 className="labels">CONFIRM PASSWORD:</h6>
                <input type={"password"} ref={passwordConfirmRef}/>
            </div>
            <div style={{textAlign:'center'}}>
                {error && <h6 className="error">{error}</h6>}
            </div>
            <div style={{display:'flex',flexDirection:'column', marginTop:'24px', alignItems:'center'}}>
                <button disabled={loading} type={"submit"} className="login-button" style={{background:'#232424'}}> REGISTER </button>
                <div>
                    <a href={"/sign-in"} className="links" style={{marginLeft:'18px'}}> Already have an account? </a>
                </div>
            </div>
        </form>
    )
}

export default RegisterForm;