import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import {Cookies, useCookies} from "react-cookie"
import  axios  from 'axios';

const Login = () => {
  
    const [credentials, setcredentials] = useState({password:"",email:""})
    let history=useNavigate();
    const [_, setcookies] = useCookies("auth-token");


    const handlesubmit= async(e)=>{
e.preventDefault() 
const response = await axios.post('http://localhost:4001/api/auth/login',credentials).then(response=>{
  console.log(response.data.authtoken)

  setcookies("auth-token",response.data.authtoken);
  window.localStorage.setItem("authtoken",response.data.authtoken)
  history("/")

  console.log(document.cookie)
 

}) 
alert("sjkdchsjk")





    }











    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    
      }


  return (
    <div className='container'>
        <form onSubmit={handlesubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" onChange={onchange} value={credentials.email} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" onChange={onchange} value={credentials.password} name='password' id="password"/>
  </div>
 
  <button type="submit" class="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login