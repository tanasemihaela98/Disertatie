import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    let token = JSON.parse(window.localStorage.getItem("user-info") );

    const [email,setEmail]=useState(null);
    const [name,setName]=useState(null);
    const [password,setPassword]=useState(null);

    const navigate = useNavigate(); 

    async function updateProfile(e)
    {
       e.preventDefault();
       //alert(password);
       let item={name,email,password};
       let result=await fetch("http://127.0.0.1:8081/api/user",{
           method:"POST",
           headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "Authorization": "Bearer " + token.data.token
                   },
                   body:JSON.stringify(item)
       })
       result=await result.json();
       localStorage.setItem("update-profile",JSON.stringify(result));
       if(result.status==true)alert('Profile changed');
        else alert('Profile error');
       //navigate('/');
         
    };

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={updateProfile}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Update Profile</h3>
           
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter name"
                  onChange={(e)=>setName(e.target.value)}
                />
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
             
            </div>
          </form>
        </div>
      )
}
 
export default UpdateProfile;
