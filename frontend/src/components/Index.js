import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import indexcss from './index.module.css'
function Index() {
  const navigate=useNavigate();
  let[name,setName]=useState('');
  let[age,setAge]=useState('');
  let[email,setEmail]=useState('')
  let[password,setPassword]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    age=Number(parseInt(age));
    const details={name,email,password,age}
    axios.post('http://localhost:4000/api/auth',details)
    .then((res)=>{
      if(res.data==="User already exists")
      {
        alert("User already exist")
      }
      else{
      console.log("Successfully inserted data",res.data);
      }
      setAge('');
      setName('');
      setPassword('')
      setEmail('')
    })
    .catch((err)=>{

      console.log("Client Side Error : "+err);
      
    })
  }
  const login=()=>{navigate('/login')}
  return (
    <div id={indexcss.div}>
    <form onSubmit={handleSubmit}>
      <h1  id={indexcss.h1}>SignUp</h1>
      <label htmlFor="name">
        Enter the name
      </label>
      <input type="text" id="name" required value={name}placeholder="Enter the name" onChange={(e)=>setName(e.target.value)}></input>
      <label htmlFor="email">
        Enter the Email Id
      </label>
      <input type="email" id="email" required value={email}placeholder="Enter the emailid" onChange={(e)=>setEmail(e.target.value)}></input>
      <br/><label htmlFor="password">
        Enter the password
      </label>
      <input type="password" id="password" value={password} required placeholder="Enter the password" onChange={(e)=>setPassword(e.target.value)}></input>
          <br/><label htmlFor="age">
        Enter the age
      </label>
      <input type="number" id="age" required value={age} placeholder="Enter the age" onChange={(e)=>setAge(e.target.value)}></input>
      <br/><button onClick={login}>Login</button>
      <button type="submit">Register</button>
    </form>
    </div>

  );
}

export default Index;
