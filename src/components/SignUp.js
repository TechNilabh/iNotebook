import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5001/api/auth/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Saving auth token and redirecting 
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" minLength={5} required name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" minLength={5} required name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" minLength={5} required name="cpassword" onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </>
  );
}

export default SignUp;

// import React from 'react'
// import {useHistory,useState} from 'react-router-dom'
// const SignUp = () => {
//   const[credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
//   let history = useHistory(); 
//   const handleSubmit =async(e)=>{
//     e.preventDefault();
//     const {name,email,password} = credentials;
//     const response = await fetch("http://localhost:5001/api/auth/createuser" , {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email: credentials.email, password: credentials.password})
//     });
//     const json = await response.json()
//     console.log(json);
//     if(json.success){
//         // Saving auth token and redirecting 
//         localStorage.setItem('token',json.authtoken);
//         history.push('/')
//     }
//     else{
//         alert("Invalid credentials")
//     }
// }
// const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//   <div className="mb-3">
//     <label htmlFor="name" className="form-label">Name</label>
//     <input type="text" className="form-control" id="name" name ="name" aria-describedby="emailHelp"/>
//    </div> 
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="email" minLength={5} required name = "email" aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" className="form-control" id="password" minLength={5} required name ="password"/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="cpassword" className="form-label">Confirm Password</label>
//     <input type="password" className="form-control" id="cpassword" minLength={5} required name = "cpassword"/>
//   </div>
 
//   <button type="submit" className="btn btn-primary">Add Note</button>
// </form>
//     </>
//   )
// }

// export default SignUp
