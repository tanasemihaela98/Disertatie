import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const [email,setEmail]=useState("");
    const [code,setCode]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate(); 

    async function changePassword(e)
    {
       e.preventDefault();
       //alert(password);
       let item={email,code,password};
       let result=await fetch("http://127.0.0.1:8081/api/change-password",{
           method:"POST",
           headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                   },
                   body:JSON.stringify(item)
       })
       result=await result.json();
       localStorage.setItem("change-password",JSON.stringify(result));
       if(result.status==true)alert('Password changed');
        else alert('Change password error');
       //navigate('/');
         
    }

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={changePassword}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Change Password</h3>
           
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
                <label>Code</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter code"
                  onChange={(e)=>setCode(e.target.value)}
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
             
            </div>
          </form>
        </div>
      )
}
 
export default ChangePassword;
