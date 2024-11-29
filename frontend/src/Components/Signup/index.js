import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import './index.css'
import { useState } from 'react'
import { handleError,handleSuccess } from '../../utils'
import Login from '../Login'
const Signup=()=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [mobileNo,setmobileNo]=useState('');


const navigate=useNavigate();


const onChangeName=(e)=>{
    setName(e.target.value)
}
const onChangeEmail=(e)=>{
    setEmail(e.target.value)
}
const onChangePassword=(e)=>{
    setPassword(e.target.value)
}
const onChangeMobileNumber=(e)=>{
    setmobileNo(e.target.value)
}

const submitForm=async (e)=>{
    e.preventDefault();
    const data={name,password,email,mobileNo};
    console.log(data);
    if(!name || !email || !password || !mobileNo){
        return handleError("name,email,password and phoneNummber required");
    }
    try{
        const url="http://localhost:8080/auth/signup";
        const response=await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const res=await response.json();
        const {success,message,error}=res;
        console.log(res);
        if(success){
            handleSuccess(message);
            setTimeout(()=>{
                navigate('/login');
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
        <div className="signup">
            <div className="container">
            <form onSubmit={submitForm}>
                <div>
                <h2>SignUp</h2>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" autoFocus placeholder="Enter Your Name.." onChange={onChangeName} value={name}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" autoFocus placeholder="Enter Your Email.." onChange={onChangeEmail} value={email}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" autoFocus placeholder="Enter Your Password.." onChange={onChangePassword} value={password}/>
                </div>
                <div>
                    <label htmlFor="mobileNo">Name</label>
                    <input type="text" name="MobileNo" autoFocus placeholder="Enter Your MobileNumber.." onChange={onChangeMobileNumber} value={mobileNo}/>
                </div>
                <button type="submit">SignUp</button>
                <span>Already have an account?<Link to='/login'>Login</Link></span>
            </form>
            <ToastContainer/>
        </div>
        </div>

    )
}
export default Signup