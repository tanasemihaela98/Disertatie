import { useState } from "react";
import { Link } from "react-router-dom";

const VerifyEmailToken = () => {
   
    const [code,setCode]=useState("");
    const [email,setEmail]=useState("");

    async function verifyToken(e)
     {
        e.preventDefault();
        //alert(password);
        let item={email,code};
        let result=await fetch("http://127.0.0.1:8081/api/verify-email",{
            method:"POST",
            headers:{
                     "Accept":"application/json",
                     "Content-Type":"application/json"
                    },
                    body:JSON.stringify(item)
        })
        result=await result.json();
        localStorage.setItem("verify-email-token",JSON.stringify(result));
        if(result.status==true){alert('Email verified');}
          else alert('Error at verifying email'); 
      
     }

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={verifyToken}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Verify Email Token</h3>
           
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mt-3">
                <label>Token</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter token"
                  onChange={(e)=>setCode(e.target.value)}
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

export default VerifyEmailToken;