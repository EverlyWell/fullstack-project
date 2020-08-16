import React, {useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {LoginProps} from "../types";

const Login: React.FunctionComponent<LoginProps> = ({ loggedIn, setLoggedIn}) =>{
    const emailInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let email = '';
        if(emailInput.current) email = emailInput.current.value;
        let password = '';
        if(pwdInput.current) password = pwdInput.current.value;

        try{
            const res = await axios.post('/api/user_token', {auth: {email, password}})
            if(res.data.jwt){
                setLoggedIn(true);
                Cookies.set('jwt', res.data.jwt);
            }
        } catch(err) {
            console.log('wrong credentials');
        }
    }

    const handleLogout = () => {
        Cookies.remove('jwt');
        setLoggedIn(false);
    }

    if(loggedIn){
        return (
            <input className={'Logout'} type="submit" onClick={handleLogout} value="Logout" />
        );
    } else {
        return (
            <form className={'Login'} onSubmit={handleLogin}>
                <div> email: <input name='email' ref={emailInput} defaultValue=''/></div>
                <div> password: <input name='password' type="password" ref={pwdInput} defaultValue=''/></div>
                <div><input type="submit" value="Login" /></div>
            </form>
        );
    }
}
export default Login;