import React, { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {useStateContext} from "./ContextProvider";

export default function (props) {
  let [authMode, setAuthMode] = useState("login")
  
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login")
  }

  const navigate = useNavigate(); 
 
  // login incercare
     const [email,setEmail]=useState("");
     const [password,setPassword]=useState("");
     const [password_confirmation,setPasswordConfirmation]=useState("");
     const [name,setName]=useState("");
     const {setUser, setToken} = useStateContext()

     /*useEffect(()=>{
        if(localStorage.getItem('user-info')){
            //navigate("/");
        }
     },[]);*/

     async function login(e)
     {
        e.preventDefault();
        //alert(password);
        let item={email,password};
        let result=await fetch("http://127.0.0.1:8081/api/login",{
            method:"POST",
            headers:{
                     "Accept":"application/json",
                     "Content-Type":"application/json"
                    },
                    body:JSON.stringify(item)
        })
        result=await result.json();
        localStorage.setItem("user-info",JSON.stringify(result));
        if(result.status==true){alert('Logged in');window.location.reload();}
          else alert('Error at login');      
     }

  // login incercare    

  //register
  async function register(e)
  {
     e.preventDefault();
     //alert(password);
     let item={name,email,password,password_confirmation};
     let result=await fetch("http://127.0.0.1:8081/api/register",{
         method:"POST",
         headers:{
                  "Accept":"application/json",
                  "Content-Type":"application/json"
                 },
                 body:JSON.stringify(item)
     })
     result=await result.json();
     localStorage.setItem("user-register-info",JSON.stringify(result));
     if(result.status==true){alert('Register success');window.location.reload();}
      else alert('Error at register'); 
   
  }
  //register
  
  if (authMode === "login") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={login}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Register
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button   className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="/forgot-password">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  //Register
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={register}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password confirmation</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password confirmation"
              onChange={(e)=>setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="/forgot-password">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}