import React, {useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

// @ts-ignore
const Login = ({ loggedIn, setLoggedIn}) =>{
    const emailInput:any = useRef(null);
    const pwdInput:any = useRef(null);
    console.log(loggedIn);

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const email = emailInput.current.value;
        const password = pwdInput.current.value;
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
            <input type="submit" onClick={handleLogout} value="Logout" />
        );
    } else {
        return (
            <form onSubmit={handleLogin}>
                <div> email: <input name='email' ref={emailInput} defaultValue=''/></div>
                <div> password: <input name='password' type="password" ref={pwdInput} defaultValue=''/></div>
                <div><input type="submit" value="Login" /></div>
            </form>
        );
    }
}
export default Login;