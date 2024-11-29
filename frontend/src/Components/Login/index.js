import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './index.css'
import { useState } from 'react'
import { handleError,handleSuccess } from '../../utils'
const Login=()=>{

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
   


const navigate=useNavigate();



const onChangeEmail=(e)=>{
    setEmail(e.target.value)
}
const onChangePassword=(e)=>{
    setPassword(e.target.value)
}


const submitForm=async (e)=>{
    e.preventDefault();
    const data={password,email};
    console.log(data);
    if( !email || !password ){
        return handleError("email,password  required");
    }
    try{
        const url="http://localhost:8080/auth/login";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const res=await response.json();
        const {success,message,error,jwtToken,name}=res;
        console.log(res);
        if(success){
            handleSuccess(message);
            localStorage.setItem('token',jwtToken)
            localStorage.setItem('loggedIn',name)
            setTimeout(()=>{
                navigate('/');
            },1000)
        }else if(error){
            const details=error?.details[0].message;
            handleError(details);
        }else if(!success)
        {
            handleError(message);
        }

    }catch(err){
        handleError(err);
    }
}

    return(
        <div className="login">
            <div className="container">
            <form onSubmit={submitForm}>
                <div>
                <h2>Login</h2>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" autoFocus placeholder="Enter Your Email.." onChange={onChangeEmail} value={email}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" autoFocus placeholder="Enter Your Password.." onChange={onChangePassword} value={password}/>
                </div>
                <button type="submit">Login</button>
                <span>Dont have an account?<Link to='/signup'>Signup</Link></span>
            </form>
            <ToastContainer/>
        </div>
        </div>

    )
}
export default Login