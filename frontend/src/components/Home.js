import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import myimage from '../images/industry-3087398_640.jpg'
function Home() {
  const [message,setMessage]=useState("")
  const {setToken,token}=useContext(AuthContext)
  const navigate=useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.get("http://localhost:4000/api/auth/home", {
      headers: {
        Authorization:token
      }
    })
    .then((res)=>{
      setMessage(res.data.message)
    })
    .catch((err)=>{
     setToken(null)
    })
   
  });
const handleLogout=()=>{
  localStorage.removeItem("token");
  setToken(null)
  navigate('/login')
}
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  <h1>{message}</h1>
  <button  style={{ margin: '10px 0' }} onClick={handleLogout}>Logout</button>
  <img src={myimage}  alt="image" style={{width:'500px'}}></img>
  </section>
  )
}

export default Home;
