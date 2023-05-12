import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Cookies, useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";

const Navber=()=> {
  const location=useLocation()
  let history=useNavigate();
  const [cookies, setcookies] = useCookies("auth-token");
  const logout=()=>{
    
   setcookies("authtoken","")
   localStorage.removeItem("authtoken")
   history("/login")
  }
  useEffect(() => {
   
  console.log(location)
    
  }, [location])
  
  return (
   <div>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">iNotebook</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/"?"active":"bg-light" }`} aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/about"?"active":"bg-light" }`} to="/About">About us</Link>
        </li>
        
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/contact"?"active":"bg-light" }`} to="/contact">contact us</Link>
        </li>
        </ul>

        { !localStorage.getItem("authtoken")?<form action="d-flex">
        
          <Link class="btn btn-primary" to="/login">Login</Link>
          <Link class="btn btn-primary mx-3" to="/signup">Signup</Link>
  
        </form>:<button  onClick={logout} className='btn btn-primary'>Logout</button>
        }
         
        
      
  
      
    </div>
  </div>
</nav>

   </div>
  )
}
export default Navber;