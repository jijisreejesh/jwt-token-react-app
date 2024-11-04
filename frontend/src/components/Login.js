import React, { useContext, useState,useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
  let { setToken ,token} = useContext(AuthContext);
  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const details = { email, password };
    axios
      .post("http://localhost:4000/api/auth/login", details)
      .then((res) => {
        if (res.data === "mismatch") alert("Username mismatch");
        else if (res.data === "password mismatch")
          alert("Password is incorrect");
        else {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
         setToken(null);
        localStorage.removeItem("token");
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data); // Set the error message if present in the error response
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
    
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {
        <>
          <h1>LogIn</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Enter the email id</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              placeholder="Enter the email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <label htmlFor="password">Enter the password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              placeholder="Enter the password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br />
            <button onClick={handleBack}>Back</button>
            <button type="submit">Login</button>
          </form>
        </>
      }
    </div>
  );
}

export default Login;
