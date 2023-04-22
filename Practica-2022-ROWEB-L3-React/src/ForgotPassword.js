import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  
const [email,setEmail]=useState("");

async function forgotPassword(e)
{
   e.preventDefault();
   let item={email};
   let result=await fetch("http://127.0.0.1:8081/api/forgot-password",{
       method:"POST",
       headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
               },
               body:JSON.stringify(item)
   })
   result=await result.json();
   localStorage.setItem("forgot-password",JSON.stringify(result));
   if(result.status==true){alert('Forgot password code sent');}
   else alert('Error at sending forgot code!'); 
   
}

   
    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={forgotPassword}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Forgot Password</h3>
           
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
             
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
             
            </div>
          </form>
        </div>
      )
}

export default ForgotPassword;